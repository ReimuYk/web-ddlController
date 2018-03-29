# coding: UTF-8
import time
import datetime
import os

refdate = None

def insertDDL(name,ddl,content):
    f = open('./helloworld/datas/ddls.txt','a')
    f2 = open('./helloworld/datas/counter.txt','r')
    counter = f2.readline()
    f2.close()
    f2 = open('./helloworld/datas/counter.txt','w')
    f2.write(str(int(counter)+1))
    f2.close()
    f.write(counter)
    f.write('\t')
    f.write(name)
    f.write('\t')
    f.write(ddl)
    f.write('\t')
    f.write(content)
    f.write('\n')
    f.close()

dailylist = [['']]
def dailyWork():
    print('daily work refresh')
    t_hour = datetime.datetime.today().hour
    if t_hour!=4:
        return
    os.remove("./helloworld/datas/daily-res.txt")
    os.system("copy ./helloworld/datas/daily-ori.txt ./helloworld/datas/daily-res.txt")
    print("daily refresh!")

weeklylist = [{'trigger':5,'type':'offset','value':5,'time':'24:00','name':'ics','content':'ics周常'},
              {'trigger':2,'type':'offset','value':2,'time':'24:00','name':'database','content':'数据库周常'}]
def weeklyWork():
    print('weekly work refresh')
    global refdate
    today = datetime.date.today()
    t_hour = datetime.datetime.today().hour
    if refdate==today or t_hour!=4:
        return
    refdate = today
    wk = today.weekday()
    for item in weeklylist:
        if wk==item['trigger']:
            if item['type']=='offset':
                nextDay = today + datetime.timedelta(item['value'])
                ddl = str(nextDay.year)+'.'+str(nextDay.month)+'.'+str(nextDay.day)+'-'+item['time']
                insertDDL(item['name'],ddl,item['content'])

def main():
    while True:
        dailyWork()
        weeklyWork()
        time.sleep(9000)
                
main()
