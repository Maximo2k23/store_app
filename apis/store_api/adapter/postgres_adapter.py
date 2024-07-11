import psycopg2

class PostgresAdapter:
    def __init__(self) -> None:
        pass

    def connection(self):
        mypg = psycopg2.connect(
            #host='127.0.0.1',
            host='host.docker.local',
            user='admin', 
            password='1234',
            database='store',
            port='5432',
            options='-c search_path=store'
        )
        print('connection success')
        return mypg