window.addEventListener('load',function() {
    //注意事项，对变量的一个控制，分清楚什么是全局变量，什么是局部变量
    var arr_l = document.querySelector('.arr-l');
    var arr_r = document.querySelector('.arr-r');
    var focus = this.document.querySelector('.focus')
    var focusWidth = focus.offsetWidth;
    //1.实现鼠标经过时，左右按钮显示
   focus.addEventListener('mouseover',function() {
       arr_l.style.display = 'block';
       arr_r.style.display = 'block';
       clearInterval(time);
   })

    //2.鼠标离开时，左右按钮隐藏
    focus.addEventListener('mouseout',function() {
        arr_l.style.display = 'none';
        arr_r.style.display = 'none';
         time = setInterval(function() {
            arr_r.click()
        },2000)  
    })
    //3.动态生成小圆圈{
    //    1.遍历ul有几张图片
    //    2.创建ol里面的小li 3.把li添加到ol里 4.用排他思想实现点击的那个小圆圈是白的
    //}
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for(var i = 0; i<ul.children.length;i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index',i);              
        li.addEventListener('click',function() {
    //4.点击小圈圈时，图片跟着移动
        for(var i = 0; i<ol.children.length;i++) {
            ol.children[i].className = '';
               
        }
        this.className = 'current';
        index = this.getAttribute('index');
        num = index;
        circle = index;
       
        animate(ul,-index * focusWidth)
        })
    }
    ol.children[0].className = 'current'
    // console.log(ul.children.length);
      
    //6.实现无缝滚动的效果{
    //    1.克隆第一张图片
    //    2.进行判断，看移动到那一张，如果移动到最后一张就强行把他改到第一张
    //}
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //5.点击右按钮，使图片向左移动
    var num = 0;
    var circle = 0;
    var flag = true;
    arr_r.addEventListener('click',function() {
        if(flag){
            flag = false;
        if(num == ul.children.length-1) {
            num = 0;
        }
        num++;
        animate(ul,-num * focusWidth,function() {
            flag = true;
        })

        circle++;
        if(circle == ol.children.length) {
            circle =0;
        }
        change();
        }
    }) 

     //左按钮
     arr_l.addEventListener('click',function() {
        if(flag) {
            flag = false;
        if(num == 0 ) {
            num = ul.children.length-1;
        }
        num--;
        animate(ul,-num * focusWidth,function() {
            flag = true;
        })
        
        
        if(circle == 0) {
            circle = ol.children.length;
        }
        circle--;
        change();
        }
    })
     //7.使图片在滚动的时候，小圆圈也相应的跟着滚动
    function change() {
        for(var i = 0; i<ol.children.length;i++) {
            ol.children[i].className = '';
        }
       ol.children[circle].className = 'current';
     }

     //8.实现自动轮播效果
     var time = setInterval(function() {
         arr_r.click()
     },2000)  
    
    //9.鼠标经过时，停止轮播   

})