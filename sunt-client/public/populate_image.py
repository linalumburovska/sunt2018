import csv
import mysql.connector

cnx = mysql.connector.connect(user='sa', password='sunt',
                              host='127.0.0.1',
                              database='sunt')

cursor = cnx.cursor()
paths = []

"""
row[0] id---------------------project&author
row[1] author-----------------author
row[2] title------------------project
row[3] english_title----------project
row[4] make_year--------------project
row[5] type-------------------project
row[6] english_type-----------project
row[7] description------------author
row[8] english_description----author
row[9] biography--------------author
row[10]english_biography------author
row[11]comment----------------project
row[12]english_comment--------project

"""

try:
    # Polnjenje tabele project, author in project_author
    cursor.execute("delete from project;")
    cursor.execute("delete from author;")
    cursor.execute("delete from project_author;")
    cursor.execute("alter table project drop column if exists theme;")
    cursor.execute("alter table project drop column if exists make_year;")
    cursor.execute("alter table project drop column if exists comment;")
    cursor.execute("alter table project drop column if exists english_comment;")
    cursor.execute("alter table project drop column if exists type;")
    cursor.execute("alter table project drop column if exists english_type;")

    cursor.execute("alter table author drop column if exists biography;")
    cursor.execute("alter table author drop column if exists english_biography;")

    cursor.execute("ALTER TABLE project ADD COLUMN make_year VARCHAR(15) NULL DEFAULT NULL;")
    cursor.execute("ALTER TABLE project ADD COLUMN comment VARCHAR(511) NULL DEFAULT NULL;")
    cursor.execute("ALTER TABLE project ADD COLUMN english_comment VARCHAR(511) NULL DEFAULT NULL;")
    cursor.execute("ALTER TABLE project ADD COLUMN type VARCHAR(63) NULL DEFAULT NULL;")
    cursor.execute("ALTER TABLE project ADD COLUMN english_type VARCHAR(63) NULL DEFAULT NULL;")
    cursor.execute("ALTER TABLE author ADD COLUMN biography VARCHAR(1023) NULL DEFAULT NULL;")
    cursor.execute("ALTER TABLE author ADD COLUMN english_biography VARCHAR(1023) NULL DEFAULT NULL;")

    add_project = ("INSERT INTO project "
                   "(id, title, english_title, make_year, type, english_type, description, english_description, "
                   "order_index, comment, english_comment) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);")
    auth = ("INSERT INTO author (id, name, biography, english_biography) VALUES (%s, %s, %s, %s);")
    pro_auth = ("INSERT INTO project_author (author_id, project_id) VALUES (%s, %s);")

    with open('./data.csv', 'r', encoding='utf-8') as file:
        reader = csv.reader(file, delimiter=";")
        for row in reader:
            id = row[0]
            project_data = [id] + row[2:9] + [id] + row[11:13]
            auth_data = row[0:2] + row[9:11]
            cursor.execute(add_project, project_data)
            cursor.execute(auth, auth_data)
            cursor.execute(pro_auth, [id, id])


    # Polnjenje tabele image
    cursor.execute("delete from image;")
    cursor.execute("alter table image drop column if exists english_alt;")
    cursor.execute("alter table image drop column if exists video_path;")

    cursor.execute("ALTER TABLE image ADD COLUMN english_alt VARCHAR(511) NULL DEFAULT NULL;")
    cursor.execute("ALTER TABLE image ADD COLUMN video_path VARCHAR(100) NULL DEFAULT NULL;")
    cursor.execute("ALTER TABLE image CHANGE COLUMN alt alt VARCHAR(511);")

    add_image = ("INSERT INTO image (id, path, alt, english_alt, video_path) VALUES (%s, %s, %s, %s, %s);")
    with open('./desc.csv', 'r', encoding='utf-8') as file:
        reader = csv.reader(file, delimiter=";")
        i = 1
        for row in reader:
            data = [i] + row[0:4]
            paths.append([i, row[0]])
            i += 1
            cursor.execute(add_image, data)

    # Polnjenje tabele project_image
    cursor.execute("delete from project_image;")
    pro_img = ("INSERT INTO project_image (image_id, project_id) VALUES (%s, %s);")
    for index in paths:
        data = [index[0]] + [index[1].split("/")[1].split("_")[0]]
        cursor.execute(pro_img, data)

except mysql.connector.Error as err:
    print("Something went wrong: {}".format(err))
finally:
    cnx.close()
