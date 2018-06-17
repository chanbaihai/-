$.extend({waterFull: {}});

$.extend($.waterFull, {
    //  XXX(){} 为ES6中对象方法的简写，不理解的就当成一个函数
    init() {
        //HTML里要记得调用$.waterFull.init()初始化
        this.getInitHeight();
        //先初始化获取第一行的高数数组在执行下面的加载图片方法
        this.loadImage();
    },
    parent: $(".container"),//获取最大div
    heightArray: [],//定义高度数组
    minHeight: 0,//定义最小高度默认为0
    minIndex: 0,//定义最小高度的索引默认为0
    getInitHeight() {//循环遍历HTML里写的四个内容块，获得高度push进高度数组
        for (let i = 0; i < $(".son").length; i++) {
            this.heightArray.push($(".son").eq(i).outerHeight());
            //outerHeight包含边框内边距高度
        }
    },
    getMinHeight() {
        //定义min方法来获取数组最小高度
        this.minHeight = Math.min.apply(this, this.heightArray)
    },
    getMinIndex() {
        //定义方法获取最小高度对应的数组下标
        this.minIndex = this.heightArray.indexOf(this.minHeight)
    },
    loadImage() {//遍历图片数组生成内容块，插入最大div
        for (let i = 0; i < this.imgArray.length; i++) {
            //for,each遍历都可以，我就用最简单的for吧
            let div = $("<div/>");
            let img = new Image();
            //这里new 一个Image对象
            $(img).load(() => {//这里监听img对象的load事件，加载完毕执行waterFull布局
                this.waterFull(div);
            });
            //给img对象赋src路径
            img.src = `./img/${this.imgArray[i]}.jpg`;
            let template = this.template(img.src);
            //关键一步将img对象src复制给template这样浏览器就不会再加载了，img对象加载完就能直接读取
            div.append(template);
            this.parent.append(div);
            //讲内容块添加进parent以后执行定位方法函数
        }
    },
    waterFull(div) {
        this.getMinHeight();
        this.getMinIndex();
//每次添加一个内容块前都重新获取当前最小高度和索引
        div//每次动态生成要定位的div
            .css({
                position: "absolute",
                left: $(".son").eq(this.minIndex).position().left,
                //jQ position方法，如果不理解百度查下
                top: this.minHeight,
            });
        this.heightArray[this.minIndex] += div.outerHeight()

    },
    template(src) {//复制HTML内容块模板，增加变量src 让函数返回模板字符串
        return `<div class="son">
        <div class="content">
            <img src="${src}">
        </div>
    </div>`
    },
    imgArray://根据下载图片生成图片路径数组，就不用ajax了，原理一样
        ["https://ws1.sinaimg.cn/large/005zqAfjgy1fse9hiivaij304805nglh.jpg",
            "https://ws1.sinaimg.cn/large/005zqAfjgy1fse9hijwptj304805nt8l.jpg",
            "https://ws1.sinaimg.cn/large/005zqAfjgy1fse9hijyg3j306g06g0sm.jpg",
            "https://ws1.sinaimg.cn/large/005zqAfjgy1fse9hije2jj306g06g746.jpg",
            "https://ws1.sinaimg.cn/large/005zqAfjgy1fse9hikdyrj305p08kjrd.jpg",
            "https://ws1.sinaimg.cn/large/005zqAfjgy1fse9hijiorj3050050748.jpg",
            "https://ws1.sinaimg.cn/large/005zqAfjgy1fse9him3tjj305p08kmx6.jpg",
            "https://ws1.sinaimg.cn/large/005zqAfjgy1fse9himxykj305p08kq35.jpg",
            "https://ws1.sinaimg.cn/large/005zqAfjgy1fse9hin2avj305p08kdfy.jpg",
            "https://ws1.sinaimg.cn/large/005zqAfjgy1fse9hio2jaj305p08kt8v.jpg",
            "https://ws1.sinaimg.cn/large/005zqAfjgy1fse9hindi5j304z04z0sr.jpg",
            "https://ws1.sinaimg.cn/large/005zqAfjgy1fse9hinl5ij305p08k74k.jpg",
        ]
});










