from adapter.postgres_adapter import *
from model.product import ProductModel
from psycopg2.extras import RealDictCursor

cursor = None

class ProductRepository:
  def __init__(self):
    #self.data = data
    global cursor, cnt
    mysql = PostgresAdapter()
    cnt = mysql.connection()
    cursor = cnt.cursor(cursor_factory=RealDictCursor)
    #None

  def get_all(self):
    cursor.execute("SELECT * FROM {}".format(ProductModel.__tablename__))
    result = cursor.fetchall()
    return result
  
  def get_by_id(self,id):
    cursor.execute("SELECT * FROM {} WHERE id=%s".format(ProductModel.__tablename__),id)
    result = cursor.fetchall()
    return result

  def create(self, data):
    placeholders = ', '.join(['%s'] * len(data))
    columns = ', '.join(data.keys())
    sql = "INSERT INTO %s ( %s) VALUES ( %s )" % (ProductModel.__tablename__, columns, placeholders)
    cursor.execute(sql, list(data.values()))
    cnt.commit()
    return cursor.rowcount
  
  def update(self, id, data):
    placeholders = ', '.join(['%s'] * len(data))
    columns = '=%s, '.join(data.keys())
    columns = columns+"=%s"
    #print(columns)
    sql = "UPDATE %s set %s WHERE id=%s" % (ProductModel.__tablename__, columns, id)
    cursor.execute(sql, list(data.values()))
    cnt.commit()
    return cursor.rowcount