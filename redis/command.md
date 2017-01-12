```bash
auth 'password' #验证密码
echo message #打印消息
ping #查看服务是否运行
quit #关闭当前连接
select index #切换数据库

info #查看服务器信息
client List
client getname
client pause timeout #指定时间内终止运行来自客户端的命令
client setname connection-name #设置当前连接的名称
command 获取redis命令详情数组
command count
command getkeys #获取给定命令的所有键
command info command-name [command-name]
time
cluster slots #获取集群节点的映射数组
```
## key
```bash
del key
#序列化
dump key
exists key
expire key
#设置过期（UNIX）时间
expire key timestamp
#设置过期时间
pexpire key milliseconds
pexpire key milliseconds-timestamp
keys pattern
move key db
#移除过期时间
persist key
#以毫秒为单位返回key的剩余的过期时间
PTTL key
#以秒为单位返回key的剩余的过期时间
TTL key
#随机返回一个key
randomkey
rename key newkey
#仅当newkey不存在时，将key改名为newkey
renamenx key newkey
#返回key所存储的值得类型
type key
```

## String
```bash
getrange key start end #返回子字符串
setrange key offset value #从offset开始用value覆盖
getset key value #设置并返回key旧值
getbit key offset #获取指定偏移量上的位
#设置与获取
set key value
setex key seconds value #将值value关联到key，并将key的过期时间设为seconds
psetex key milliseconds value #毫秒
mset key value [key value] #设置多个值对
setnx key value #只有在key不存在时设置key的值
setbit key offset value #对key所存储的字符串值，设置或清除指定偏移量上的bit
msetnx key value [key value] #同时设置一个或多个key-value对，晋档所有给定key都不存在
get key
mget key1 [key2] #获取一个或多个key的值
#加减
incr key #将key中数字值加一
incrby key increment #加指定值
incrbyfloat key increment #加浮点增量值
decr key #减一
decrby key decrement #key所存储的值减去给定的减量值
#追加
append key value
```

## Hash
```bash
hmset runoobkey name "redis tutorial" description "redis basic commands for caching" likes 20 visitors 23000
hgetall runoobkey
hdel key field2 [field2] #删除一个或多个哈希表字段
hexists key field
hget key field
hgetall key
hincrby key field increment
hincrbyfloat key field increment
hkeys key #获取所有哈希表中的字段
hlen key #获取哈希表中字段的数量
hmget key field [field] #获取所有给定字段的值
hset key field value
hmset key field value [field value]
hsetnx key field value #只有field不存在时，设置哈希表字段的值
hvals key #获取哈希表中所有值
#迭代哈希表中的键值对
hscan key cursor [MATCH pattern] [COUNT count]
```

## List
```bash
lpush key value [value]
lpushx key value
lrange key start stop

```

## 订阅与发布
```bash
subscribe channel [channel]
psubscribe pattern [pattern]
unsubsc
publish channel message

```

## 事物
```bash
multi #开始事物
set book-name "Mastering C++ in 21 days"
get book-name
SADD tag "C++" "Programming" "Mastering Series"
smembers tag
exec #执行事物

discard #取消事物
unwatch #取消watch命令对key的监视
watch key [key] #监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。
```
