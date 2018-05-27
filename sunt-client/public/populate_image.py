import csv
import mysql.connector
from pathlib import Path


cnx = mysql.connector.connect(user='sa', password='sunt',
                              host='127.0.0.1',
                              database='sunt')

cursor = cnx.cursor()

"""
def validate(project_data):
    for val in project_data:
        if not val and type(val) is not int:
            raise ValueError("Data missing!")
"""

try:
    #cursor.execute("delete from image;")
    cursor.execute("alter table `image` drop column if exists `english_alt`;")
    cursor.execute("alter table `image` drop column if exists `video_path`;")

    cursor.execute("ALTER TABLE `image` ADD COLUMN `english_alt` VARCHAR(511) NULL DEFAULT NULL;")
    cursor.execute("ALTER TABLE `image` ADD COLUMN `video_path` VARCHAR(100) NULL DEFAULT NULL;")
    cursor.execute("ALTER TABLE `image` CHANGE COLUMN `alt` `alt` VARCHAR(511);")

    add_image = ("INSERT INTO image (id, path, alt, english_alt, video_path) VALUES (%s, %s, %s, %s, %s);")

    #head_path = Path().absolute() # Path to the directory which we are in
    #print(head_path)

    with open('./desc.csv', 'r', encoding='utf-8') as file:
        reader = csv.reader(file, delimiter=";")
        i = 1
        for row in reader:
            data = [i] + row[0:4]
            i += 1
            cursor.execute(add_image, data)
except mysql.connector.Error as err:
    print("Something went wrong: {}".format(err))
finally:
    cnx.close()
