import re , json


def abrakadabra(IMPORT,NAME,YEAR):
    s = open(IMPORT, "r", encoding="utf-8")
    z = open(NAME + ".json", "w", encoding="utf-8")


    items = {}

    fnmk = r"\\fnmk\{(\d+)\}"
    fnt = r"\\fnt\{(\d+)\}"
    between = r"\{([^}]*)\}"
    pp = r"\\pp"
    nb = r"\\nb"

    counter = 10000
    for i in s:
        i = i.strip()

        if len(re.findall(nb, i)) > 0:
            day_of_week = re.findall(between, i)[1]

        if len (re.findall(pp, i)) > 0:

            num = counter
            if len (re.findall(fnmk, i)) != 0:
                num = re.findall(fnmk, i)[0]

            i = i[3:]
            i = i.split(":", 1)

            time, info = i
            start , finish = time.split("-")

            start =int(start.replace(".", ""))
            column = ((start - 800) // 100 ) * 6 + 1 + (start % 100) // 10

            finish = int(finish.replace(".", ""))
            duration = ((finish - start) // 100) * 6 + ((finish - start) % 100) // 10

            where, _, _, name, code, _, _, sem = re.findall(between,info)
            name = name.split("\\")[0]

            type = ""
            if "/" in code:
                type = "cviko"
            else:
                type = "prednaska"
            code = code.split("/")[0]

            if num not in items.keys():
                items[num] = [name, code, type, where, str(column)+"/span "+str(duration), [day_of_week]]
            else:
                items[num][5].append(day_of_week)
                


        elif len (re.findall(fnt, i)) > 0:
            num = re.findall(fnt, i)[0]

            when = re.findall(between, i)[1]

            frequency = "all"
            if "sud" in when:
                frequency = "sudy"
            elif "lich" in when:
                frequency = "lichy"
            
            dates = re.findall(r"(\d+). (\d+)." , when)
            new_dates = []

            for date in dates:
                dd , mm = date
                if int(dd) < 10:
                    dd = "0" + dd
                if int(mm) < 10:
                    mm = "0" + mm
                new_date = dd + "-" + mm + "-" + YEAR
                if new_date not in new_dates:
                    new_dates.append(new_date)

            
            items[num].append(frequency)
            items[num].append(new_dates)

        counter += 1

    array=[]           
    for item in items.values():
        print(item)
        array.append(item)

    PORADIE_DNI = {'Po': 1, 'Út': 2, 'St': 3, 'Čt': 4, 'Pá': 5, 'So': 6, 'Ne': 7}
    array.sort(key = lambda x : (PORADIE_DNI.get(x[5][-1], 99), int(x[4].split("/")[0])))
    
    json.dump(array, z, ensure_ascii=False, indent=4)

    z.close()

# CHANGE THIS !!!!!!!!!!
PEOPLE = ["risko","adka","krsko","kubko","olko","tomi","tozicka"]
#PEOPLE = ["kubko"]
YEAR = "2026"
for i in PEOPLE:
    abrakadabra(i+".tex",i,YEAR)
# !!!!!!!!!!!!!!!!!!!!!!
