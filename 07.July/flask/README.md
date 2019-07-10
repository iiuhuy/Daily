# Flask

## 环境安装

```bash
# 检查环境 pip 是否已经安装完成.
$ pip --version
# 如果没有下载 pip 使用 python 安装
$ wget https://bootstrap.pypa.io/get-pip.py
```

安装完成使用 pip 安装 Pipenv(pip、Pipfile 和 Virtualenv 的结合体, 代替了 pip + virtualenv+requirements.txt 的方式)

```bash
$ sudo -H pip install pipenv # 全局
$ pip install --user pipenv # 用户安装
```

## 新建目录

在目录下创建虚拟环境

```bash
$ pipenv install
# 显示激活虚拟环境
$ pipenv shell
```

## usage
