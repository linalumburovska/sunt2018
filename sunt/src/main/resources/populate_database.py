import csv
import mysql.connector

cnx = mysql.connector.connect(user='sa', password='sunt',
                              host='127.0.0.1',
                              database='sunt')

cursor = cnx.cursor()


def validate(project_data):
    for val in project_data:
        if not val and type(val) is not int:
            raise ValueError("Data missing!")


try:

    add_project = ("INSERT INTO project "
                   "(id, author, title, english_title, description, english_description, order_index, theme) "
                   "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)")

    with open('./data.csv', 'r', encoding='utf-8') as file:
        reader = csv.reader(file, delimiter=";")
        i = 0
        for row in reader:
            project_data = [i] + row[1:4] + row[5:7] + [i] + [1]  # default value 1 for theme, since the lack of data

            try:
                validate(project_data)
            except ValueError as e:
                print("{}: line {}".format(e, i))
                i += 1
                continue

            # TODO: insert long description as well - two more columns needed in the database

            # TODO: insert images for each project into project_images when the data is ready

            i += 1
            cursor.execute(add_project, project_data)
except mysql.connector.Error as err:
    print("Something went wrong: {}".format(err))
finally:
    cnx.close()
