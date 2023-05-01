$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 800,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/4_sector/chevron_left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/4_sector/chevron_right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_activ)', function () {
        $(this)
            .addClass('catalog__tab_activ').siblings().removeClass('catalog__tab_activ')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
});


