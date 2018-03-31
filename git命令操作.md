
git clone git地址

cd 文件名 //进入文件



ls 查看目录

git status -s //查看项目的当前状态。
??表示没有上传缓存
A表示上传了

git add 文件名

git add .//添加当前项目的所有文件。
 
git commit -m '第一次版本提交' //将缓存区内容添加到仓库中。

# 提交到 Github

git push -u origin master



	步骤

	git clone git地址
	cd 文件名 //进入文件
	git branch -a //查看远程分支
	git checkout -b develop origin/develop //切换远程develop分支
	修改文件
	git add . //加入购物车
	git commit -m '注释' //提交到缓存
	git pull //拉取线上代码
	git push -u origin master //提交到git厂库
	git merge develop //吧develop分支合并到master