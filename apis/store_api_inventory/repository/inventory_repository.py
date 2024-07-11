#from adapter.postgres_adapter import *
from adapter.mysql_adapter import *
from model.inventory import InventoryModel
import sys

cursor = None

class InventoryRepository:
  def __init__(self):
    #self.data = data
    global cursor, cnt
    mysql = MysqlAdapter()
    cnt = mysql.connection()
    cursor = cnt.cursor(dictionary=True)
    #None

  def get_all(self, condition={}):
    sql = "SELECT * FROM {}".format(InventoryModel.__tablename__)
    if condition != {}:
      where = ''
      columns = '=%s, '.join(condition.keys())
      columns = columns+"=%s"
      sql = sql + ' WHERE {}'.format(columns)
      cursor.execute(sql,list(condition.values()))
    else:
      cursor.execute(sql)

    result = cursor.fetchall()
    return result
  
  def get_by_id(self,id):
    cursor.execute("SELECT * FROM {} WHERE id={}".format(InventoryModel.__tablename__, id))
    result = cursor.fetchall()
    return result

  def create(self, data):    
    placeholders = ', '.join(['%s'] * len(data))
    columns = ', '.join(data.keys())
    sql = "INSERT INTO %s ( %s) VALUES ( %s )" % (InventoryModel.__tablename__, columns, placeholders)
    cursor.execute(sql, list(data.values()))
    cnt.commit()
    return cursor.rowcount
  
  def update(self, id, data):
    columns = '=%s, '.join(data.keys())
    columns = columns+"=%s"
    #print(columns)
    sql = "UPDATE %s set %s WHERE id=%s" % (InventoryModel.__tablename__, columns, id)
    #print(sql)
    #print(data.values())
    cursor.execute(sql, list(data.values()))
    cnt.commit()
    return cursor.rowcount