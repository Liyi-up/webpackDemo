// 引入样式资源
import './index.less'

// 引入js资源
import $ from 'jquery';

// 引入图标等其他资源

$('#title').click(() => {
    $('body').css('backgroundColor', 'deeppink');
});
