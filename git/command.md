## 安装Git
```bash
#Linux CentOS  
sudo yum install git
#Linux Ubuntu
sudo apt-get install git
```
[windows](https://git-scm.com/download/win)

![git分区](http://www.liaoxuefeng.com/files/attachments/001384907702917346729e9afbf4127b6dfbae9207af016000/0)

## 连接github
![从github上clone](http://www.liaoxuefeng.com/files/attachments/001384926554932eb5e65df912341c1a48045bc274ba4bf000/0)  
[如何选择开源协议](http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)
```bash
#生成本机ssh公钥
ssh-keygen -t rsa -C <email>
#将其粘贴到github setting -> SSH and GPG keys中，以便让本地具有向github中写入的权限
cat ~/.ssh/id_rsa.pub
#测试是否连接到github
ssh -T git@github.com
#连接远程github
git remote add origin git@github.test/hello.git
#将本地项目更新到github上
git push -u origin master

#fork更新
#增加被fork的原始分支到本地
git remote add ant-design https://github.com/ant-design/ant-design.git
#查看本地所连接的远程分支
git remote -v
#更新原始分支最新到本地
git fetch ant-design
#合并原始分支最新与本地
git merge ant-design/master
#把最新的代码推送到github上
git push origin master
#向被fork的原始分支发起pull request
```

## 配置
```bash
#/etc/gitconfig文件存储系统上所有用的配置（优先级低）  
#查看系统配置  
git config [--system] --list                          
#~/.gitconfig或~/.config/git/config只针对当前用户的配置（优先级中）
#查看当前用户的配置  
git config [--global] --list                           
#project/.git/config存储当前项目的配置（优先级最高）  
#查看当前项目的配置,也即最终配置  
git config --list
git config -l
git config --local -l
#查看配置属性  
git config [--local] user.name                                
#查看当前系统的属性值  
git config [--global] user.name                      
#配置name属性  
git config [--global] user.name <name>                
#配置email属性  
git config [--global] user.email <email>
#关闭自动换行
git config [--global] core.autocrlf false
#保证换行符在不同操作系统的安全
git config [--global] core.safecrlf true
#git命令显示颜色
git config [--global] color.ui true

## 设置别名
git config [--global] alias.br branch
git config [--global] alias.ci commit
git config [--global] alias.st status
#设置大小写敏感
git config --global core.ignorecase false
#设置clone缓冲区大小
git cfg --global http.postBuffer 20480000
#设置默认的编辑器
git config --global core.editor vim
#编辑器中编辑配置
git config -e

#删除配置项
git config --global --unset user.name

```


## 获取帮助
```bash
#查看配置命令的帮助
git help config
```

## [.gitignore文件](https://github.com/github/gitignore)
[.gitignore文件生成工具](https://www.gitignore.io/)  
`git check-ignore` #检查.gitignore文件内容是否正确，.gitignore本身也可以被版本管理  
忽略文件的原则：
- 忽略操作系统自动生成的文件，比如缩略图等。
- 忽略编译生成的中间文件、可执行文件等。
- 忽略携带敏感等不希望被别人看到的文件

规范如下:
- 所有空行或者以＃开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配。
- 匹配模式可以以（/）开头防止递归。
- 匹配模式可以以（/）结尾指定目录。
- 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反

glob模式是指shell所使用的简化了的正则表达式:
- * :匹配零个或多个任意字符
- [abc] :只匹配括号内的任意一个字符
- [0-9] :使用短划线表示范围, 可以匹配0到9之间的任何字符.
- ? :匹配任意一个字符
- **:匹配任意的中间目录,例如a/**/z可以匹配a/z,a/b/z,a/b/c/z等

## 常用命令
#### 初始化仓库
```bash
#是当前目录变成一个git仓库，生成.git目录（关于git配置和项目历史的一切）
git init
```
#### 添加文件到暂存区，即追踪文件
```bash
#添加全部暂存区和历史区不存在的或者有更改的文件  
git add .
git add *     
#查看哪些文件被追踪
git ls-files
#添加指定文件  
git add <filename>
#强制添加某些已被gitignore忽略的文件
git add -f <filename>
#取消放到暂存区
git reset HEAD <filename>

#将修改了但是还没提交到暂存区的文件还原为最后一次提交的内容
git checkout -- <filename>

#强制更新
git fetch --all
git reset --hard origin/master
```

#### 提交到本地仓库
```bash
#提交到本地仓库  
git commit -m "commit message"    
#设置默认的编辑器  
git config --global core.edit     
#跳过暂存区直接进入仓库  
git commit -a -m "commit message"

#commit后忘记还有一个没提交
git commit -m "提交"
git add filename
git commit --amend  #将这个filename当做漏掉的补齐到最后一次提交中
```

#### 查看仓库状态  
```bash
#查看仓库状态  
git status                 
#紧凑显示  
git status -s 或`git status --status
```

- ?? :表示新添加的未追踪的文件
- M :M出现在右边,表示该文件被修改但是还没有放入暂存区
- M :M出现在左边,表示文件被修改已经放入了暂存区
- MM :出现两个,代表此文件在工作区修改已经放入了暂存区, 但之后有进行了修改,没有添加到暂存区

#### 查看文件修改的内容
```bash
#查看已追踪但尚未暂存的文件更新了哪些部分（工作区和暂存区的different）
git diff        
#查看已提交到暂存区的修改了什么（暂存区和最近版本（commit）的不同）
git diff -staged
#同上
git diff --cached
#查看本地仓库任意两个commit之间的文件变动
git diff <commit-id> <commit-id>
#暂存区、工作区和最近版本的不同
git diff HEAD
```

#### 移除文件
```bash
#删除工作区文件  
git rm filename   
#移除已添加到暂存区的文件  
git rm -f filename
#删除log目录下所有名称是.log结尾文件  
git rm log/\*.log  
#删除以~结尾的所有文件  
git rm \*~         
```
#### 移动文件
```bash
git mv file_from file_to
```
#### 查看历史提交
```bash
#显示最后一次提交
git log -1
#显示最近2次的提交  
git log -p -2                               
#简略的显示每次提交的内容更改  
git log --stat                            
#每次提交用一行显示  
git log --pretty=oneine                      
#1a99c42 - 作者，19 hour age：修复某些bug  
git log --pretty=format:"%h - %an, %ar : %s"
#图形展示分支的合并历史  
git log --graph --online
#查找一个字符串的提交历史  
git log -Smethod_name
#查看一个文件的提交历史  
git log filename
#查看作者2016-11-01到2016-11-07之间的提交
git log --pretty="%h - %s" --author=作者 --since=“2016-11-01” --before=“2016-11-07”
```
选项|说明
---|---
%H|提交对象（commit的完整哈希字串）
%h| 提交对象的简短哈希字串
%T|树对象的完整哈希字符串
%t|树对象的简短哈希字符串
%P|父对象（parent）的完整哈希字符串
%p|父对象的简短哈希字符串
%au|作者（author）的名字
%ae|作者的电子邮件地址
%ad|作者修订日期（可以用--date= 选项定制格式）
%ar|作者修订日期，按多久以前的方式显示
%cn|提交者（commit）的名字
%ce|提交者（committer）的电子邮件地址
%cd|提交日期
%cr|提交日期，按多久以前的方式显示
%s|提交说明

选项|说明
---|---
-p|按补丁格式显示每个更新之间的差异
--stat|显示每次更新的文件修改统计信息
--shortstat|只显示--stat中最后的行数修改添加移除统计
--name-only|仅在提交信息后显示已修改的文件清单
--name-status|显示新增、修改、删除的文件清单
--abbrev-commit|仅显示SHA-1的前几个字符，而非所有的40个字符
--relative-date|使用较短的相对时间显示（比如，“2 weeks ago”）
--graph|显示ASCII图形表示的分支合并历史
--pretty|使用其他格式显示历史提交信息，选项有online、short、full、fuller、format

选项|说明
---|---
-(n)|仅显示最近的n条提交
--since, --after|仅显示执行时间之后的提交
--until, --before|仅显示指定事件之前的提交
--author|仅显示指定作者相关的提交
--committer|仅显示指定提交者相关的提交
--grep|仅显示含指定关键字的提交
-S|仅显示添加或移除了某个关键字的提交

## 标签
标签是指向某个commit的指针，但是不能移动，可以是有意义的名字，比如版本号。
```bash
#列出当前分支下所有标签
git tag
#列出指定的标签  
git tag -l 'v2.*'                
#附加标签: 会保存打标签者的信息, 时间和附加信息. 最后更随打标签的提交
git tag -a v1.0 -m "附加信息"
#轻量标签，只在一个提交上做标记。默认关联到HEAD上，存储在一个专门保存标签的文件,指向提交的hash值
git tag v1.0  
#创建轻量标签
git tag v1.0-light

#获取提交历史的hash值
git log --oneline  
#同上
git log --pretty=oneline --abbrev-commit
#将标签打在某次提交上面（hash），带说明
git tag -a -m 'version 0.1 released' v1.1 a6b4c97
#将标签打在某次提交上面（hash），不带说明
git tag v1.1 abwqwqr
#查看标签信息
git show v0.2

#将标签推送到远程服务器（git push默认不会）
git push origin v1.4  
#将本地所有标签一次性提交到git服务器
git push origin --tags
#删除本地上所有远程服务器不存在的标签
git push origin --tags      
#删除本地标签
git tag -d v2.0
#删除远程标签
git push origin :refs/tags/v0.9

#标签处创建一个新的分支
git checkout -b checkbranch2 v2.0

#切换到标签
git checkout v2.0
```

## 分支

```bash
#列出本地所有分支
git branch
#全部分支及最后一次提交  
git branch -v
#展示本地分支关联远程仓库的情况
git branch -vv
#查看本地和远程所有分支
git branch -a
git branch -av #以及最新commit的信息
#查看远程分支
git branch -r
#更新分支列表信息
git fetch -p

#向远程提交本地新开的分支
git push origin <branch-name>

#创建本地分支  
git branch <branch-name>
#切换分支  
git checkout <branch-name>
#快速切换分支
git checkout -
#创建并切换到本地分支  
git checkout -b <branch-name>
#创建并切换到远程分支
git checkout -b <branch-name> origin/<branch-name>

#合并branch-name到当前分支上  
git merge <branch-name>
#查看哪些分支已经合并到当前分支
git branch --merge
#查看所有包含未合并工作的分支  
git branch --no-merged

#关联远程分支
git branch -u origin/<branch-name>
#同上
git push -u origin <branch-name>

#删除本地分支  
git branch -d <local-branchname>
#删除远程分支
git push origin :<remote-branchname>
#同上
git push origin --delete <remote-branchname>
#强制删除本地分支  
git branch -D <local-branchname>
#重命名本地分支
git branch -m <new-branch-name>

#删除已经合并到master的分支
git branch --merged master | grep -v '^\*\|  master' | xargs -n 1 git branch -d

#查看各个分支所指向的对象  
git log --oneline --decorate
#图形化查看分支所指向的对象  
git log --oneline --decorate --graph --all
#丧心病狂
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

## 远程分支
```bash
#获得远程的仓库列表
git ls-remote origin
#获得更多远程仓库信息
git remote show origin
#查看远程分支和本地分支
git branch -a
#拉取远程分支并建立相应的本地分支
git checkout -b dev origin/dev
#创建远程新的分支dev
git push origin dev
#删除远程分支
git push origin --delete dev
#克隆仓库时，会自动创建一个跟踪origin/master(Default branch)的master分支（跟踪分支），跟踪分支是与远程分支有直接关系的本地分支。
#跟踪分支
git checkout --track origin/dev
#自定义本地分支名
git checkout -b 本地分支名 origin/dev
#设置已有的本地分支跟踪一个刚刚拉取下来的远程分支，或想要修改正在跟踪的上游分支
git branch -u origin/dev
#同上
git branch --set-upstream-to origin/dev
#查看设置的所有跟踪分支
git branch -vv
```

## 远程仓库操作
```bash
#克隆仓库到本地
git clone <url>
#重命名本地根文件夹名
git clone <url> localname
#查看所有远程仓库别名
git remote
#查看远程仓库的读写权限，有push说明可以写
git remote -v
#查看更多信息
git remote show origin
#修改远程仓库url
git remote set-url origin <git-url>
#增加远程仓库并取名为rp
git remote add rp <git-url>
#对新加的远程仓库进行拉取
git fetch rp
#拉取并自动合并到当前所在分支
git pull
#推送本地分支到远程仓库
git push origin master
#远程仓库重命名
git remote rename oldname newname
#删除与一个远程仓库的关联
git remote rm <仓库名>
```

## 理解Git原理
- git保存文件的完整内容，不保存差量变化
- git以存储键值对（key-value）的方式保存文件
- 每个文件，相同文件的不同版本都有一个唯一的40位SHA-1校验和与之对应
- SHA-1校验和是文件的指针，git依靠它来区分文件
- 每个文件都会在git版本库中生成blob对象来保存
- 对于没有变化的文件，git只会保留上一个版本的指针
- git add会在`.git/objects/`中创建一个新的blob文件
- git实际是通过维持复杂的文件树来实现版本控制的
- 使用git的工作流程就是文件在三个工作区域间的流动
- 应该大量使用分支
- 分支只是对提交对象的一个引用

git对象：
- blob：存放文件的**压缩**内容
- tree：相当于目录，最终的节点是blob
- commit：指向一次提交，表示项目的快照，指向你一个顶层的tree对象，partner指向上次提交。
- tag

git中同样的文件只保存一份，使用sha-1算法，`echo 'version A' | git hash-object --stdin` 计算文件的sha-1值  
sha-1特点：由文件内容计算出的hash值；hash值相同，文件内容相同，雪崩效应。  
git中全部数据保存在.git/objects中，已sha-1前两位为文件夹名，后38位位文件名。执行`git add`将会把文件内容的hash值保存在`.git/index`中，其中每一行即映射到内容hash，如果更新了文件内容，将会更新index中的相应行和创建一个新的blob.
