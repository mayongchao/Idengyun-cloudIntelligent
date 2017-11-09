 var mySwiper1 = new Swiper('#header', {
        freeMode: true,
        slidesPerView: 'auto',
    });
    navSwitch()
    function navSwitch() {
        $(".scareList li").click(function () {
            $(".scareList .activeShowItem").removeClass("activeShowItem");
            $(this).addClass("activeShowItem");
        })
    }
    // elementData(60, 30, 90)
    /*设置油脂、水份、残留的成分指数*/
    function elementData(g, m, v) {
        $(".grease").animate({width: g+'%'}, "slow");
        $(".greaseLabel").animate({left: '+'+g+'%'}, "slow");
        $(".moisture").animate({width: m+'%'}, "slow");
        $(".moistureLabel").animate({left: '+'+m+'%'}, "slow");
        $(".vestigital").animate({width: v+'%'}, "slow");
        $(".vestigitalLabel").animate({left: '+'+v+'%'}, "slow");


    }
    // radarArguments(10,20,30,40,50,60)
    /*雷达参数配置（沿顺时针配置参数）*/
    function radarArguments([n1,n2,n3,n4,n5,n6],[v1,v2,v3,v4,v5,v6]) {
        console.log(arguments[0].length)
        var len = arguments[0].length;
        /*雷达图配置参数*/
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
            radar: {
//                shape: 'circle',
                radius:75,
                indicator: [
                    {name: n1+'', max: 100},
                    {name: n2+'', max: 100},
                    {name: n3+'', max: 100},
                    {name: n4+'', max: 100},
                    {name: n5+'', max: 100},
                    {name: n6+'', max: 100}
                ],
                fontsize: 14,
                splitNumber: 1,
                name: {
//                    formatter: '【{value}】',
                    /*控制文字的颜色*/
                    textStyle: {
                        color: '#333333'
                    }
                },
                splitArea: {
                    areaStyle: {
                        /*设置圆心向外扩展圆弧的颜色*/
                        color: ['rgba(255, 255, 255, 1)',
                            'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)',
                            'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)'
                        ],
                        /*设置圆心向外扩展的阴影以及距离*/
//                        shadowColor: 'rgba(0, 0, 0, 0.3)',
//                        shadowBlur: 10
                    }
                },
                axisLine: {
                    lineStyle: {
                        /*设置从中心点向外的直线的颜色*/
                        color: '#efbca3'
                    }
                },
                splitLine: {
                    lineStyle: {
                        /*设置外围圆圈的颜色*/
                        color: '#d2d2d2'
                    }
                }

            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                symbol: "circle",
                symbolSize:8,
                //areaStyle: {normal: {}},
                itemStyle: {
                    normal: {
                        color: '#d94729',
                        borderWidth:6,
                        borderType: 'solid',
//                        shadowColor: 'red',
//                        shadowBlur: 10,
//                        opacity: 1
                    }, emphasis: {
//                        color: '#000',
//                        borderWidth: 16
                    },
                    areaStyle: {
                        normal: {
//                            opacity: 100,
//                            color: 'red'
                        }
                    }

                },//拐点样式
                data: [
                    {
                        value: [v1, v2, v3, v4, v5, v6],
                        name: '皮肤状态',
                        areaStyle: {
                            normal: {
                                color: 'rgba(255, 220, 203, 0.5)'
                            }
                        },
                        lineStyle: {
                            normal: {
                                /*控制线的类型，是实现还是虚线*/
                                type: 'solid',
                                color: '#db4f32',
                            }
                        },
                    }
                ]
            }]
        };
        console.log(option.radar.indicator)
        option.radar.indicator =option.radar.indicator.splice(0,len)
        // option.series[0].data[0].value.splice(0,6,v1,v6,v5,v4,v3,v2)
        myChart.setOption(option);
    }
    /*环形进度条配置参数*/
    $('#circle').circleProgress({
        /*这是唯一一个必填参数。值从0.0到1.0，默认值为0*/
        value: 0,
        /*初始角度，默认值为-Math.PI*/
        startAngle: -Math.PI / 6*3,
        /*canvas的大小，单位像素，默认值100*/
        size: 92,
        /*是否反向绘制圆弧和动画，默认值为false*/
        reverse:false,
        /*进度条圆弧的宽度。默认它自动为size的1/14大小，你可以设置你需要的值。默认值为auto*/
        thickness:10,
        /*圆弧的线头样式："butt"、"round"和"square"。详细信息看这里。默认值为"butt"*/
        lineCap:'round',
        /*空圆弧的颜色。默认值为"rgba(0, 0, 0, .1)"*/
        emptyFill:'transparent',
        /*默认进度条动画会在0.0开始，结束与value处。调用该参数可以直接动画。如果需要制作反向动画就将animationStartValue的值设置为1.0。你可以指定0.0到1.0之间的任何数值。默认值为0.0*/
        animationStartValue: 0.0,
        /*动画配置。可以参考jQuery animations。你可以设置为false来禁止动画。默认值：{ duration: 1200, easing: "circleProgressEase" }。"circleProgressEase"是一个ease-in-out-cubic easing动画效果*/
        animation:{ duration: 2000 },
        /*圆弧填充的配置。*/
        fill: { image: "../images/bg_Progress_bar@2x.png" }
    });
    // grade(80)
    /*定义分数的方法*/
    function grade(score) {
        $('#circle').circleProgress({ value: score/100});
        $('.circleInside')[0].style.transform = 'rotate('+(360*score/100)+'deg)';
        $('.circleInside')[0].style.transformOrigin = '50% 50%';
        $('.circleInside')[0].style.transitionDuration = '2s';
        $('.circleInside')[0].style.transitionTimingFunction = 'cubic-bezier(0.5,0.2,0.57,1)';
        var num = 0;
        var t = setInterval(function(){
            num++;
            $('#scoreValue')[0].innerText = num;
            if(num==score){
                clearInterval(t);
            }
        },score/3.6);
    }
    // complexion(80)
    /*肤色色值配置参数*/
    function complexion(value) {
        $(".evaluate").animate({left: '+'+(100-value)+'%'}, "slow");
    }
