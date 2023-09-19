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
    // modal
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay,#consultation,#buy,#Thank_you').fadeOut('slow');
    });
    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#buy .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #buy').fadeIn('slow');
        })
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя!",
                    minlength: jQuery.validator.format("Требуется не менее {0} символов!")
                },
                phone: "Пожалуйста, введите свой номер телефона!",
                email: {
                    required: "Пожалуйста, введите свою почту!",
                    email: "Ваш адрес электронной почты должен быть в формате name@domain.com"
                }
            }
        });
    };
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#buy form');
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
});