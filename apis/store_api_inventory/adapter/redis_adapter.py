import redis

class RedisAdapter:
    def __init__(self) -> None:
        pass

    def connection(self):
        myredis = redis.Redis(
            host='host.docker.local',
            port=6379,
            db=1
        )
        print('connection success')
        return myredis