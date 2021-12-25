/*-----------------------------------------------------------------------------------
	Template Name: Pixila - Creative Multipurpose HTML Template
	Template URI: https://webtend.net/demo/html/pixila/
	Author: WebTend
	Author URI:  https://webtend.net/
	Version: 1.0

	Note: This is Main Js file
-----------------------------------------------------------------------------------
	CSS INDEX
	===================
	01. Main Menu
	02. Counter Up
	03. Team Slider
	04. Testimonial Slider
	05. Brand Slider
	06. Portfolio Slider
	07. Progress Bar
	08. Easy Pie Chart
	09. Product Gallery
	10. Popup Video
	11. Preloader
	12. Portdolio Isotope
	13. Skillset Video SLider
	14. Sticky Header
	15. Nice Select

-----------------------------------------------------------------------------------*/

(function ($) {
	'use strict';

	/*-----------------------------
	=== ALL ESSENTIAL FUNCTIONS ===
	------------------------------*/

	//=== 01. Main Menu
	function mainMenu() {
		var menuItems = $('.primary-menu'),
			navContainer = $('.header-navbar'),
			menuContainer = $('.site-nav-menu'),
			navToggler = $('.nav-toggler'),
			closeIcon = $('.nav-close');

		// Adds toggle button to li items that have children
		menuItems.find('li a').each(function () {
			if ($(this).next().length > 0) {
				$(this).parent('li').append('<span class="dd-trigger"><i class="far fa-plus"></i></span>');
			}
		});

		// expands the dropdown menu on each click
		menuItems.find('li .dd-trigger').on('click', function (e) {
			e.preventDefault();
			$(this).toggleClass('open').parent('li').children('ul').stop(true, true).slideToggle(350);
			$(this).find("i").toggleClass("fa-minus fa-plus");
		});

		// check browser width in real-time
		function breakpointCheck() {
			var windoWidth = window.innerWidth;

			if (windoWidth <= 991) {
				navContainer.addClass('breakpoint-on');
			} else {
				navContainer.removeClass('breakpoint-on');
			}
		}

		breakpointCheck();
		$(window).on('resize', function () {
			breakpointCheck();
		});

		// Open menu on toggler click
		navToggler.on('click', function (e) {
			menuContainer.toggleClass('menu-on');
			e.preventDefault();
		});

		// Close menu on toggler click
		closeIcon.on('click', function (e) {
			menuContainer.removeClass('menu-on');
			e.preventDefault();
		});

		// Search Widget
		var searchBtn = $('.search-icon'),
			searchFrom = $('.search-form');

		searchBtn.on('click', function (e) {
			searchFrom.slideToggle(350);
			e.preventDefault();
		});

		// Panel Widget
		var panelIcon = $('.panel-icon'),
			panelClose = $('.panel-close'),
			panelWrap = $('.offcanvas-panel');

		panelIcon.on('click', function (e) {
			panelWrap.toggleClass('panel-on');
			e.preventDefault();
		});

		panelClose.on('click', function (e) {
			panelWrap.removeClass('panel-on');
			e.preventDefault();
		});

		// One Page Animation
		var scrollLink = $(".onepage-nav li a");
		$(window).scroll(function () {
			var scrollbarLocation = $(this).scrollTop();
			scrollLink.each(function () {
				var sectionOffset = $(this.hash).offset().top - 90;
				if (sectionOffset <= scrollbarLocation) {
					$(this).parent().addClass("current");
					$(this).parent().siblings().removeClass("current");
				}
			});
		});
	}

	//=== 02. Counter Up
	function counterUp() {
		$('.counter-box').on('inview', function (event, isInView) {
			if (isInView) {
				$(this).find('.counter').each(function () {
					var $this = $(this);
					$({
						Counter: 0
					}).animate({
						Counter: $this.text()
					}, {
						duration: 2000,
						easing: 'swing',
						step: function () {
							$this.text(Math.ceil(this.Counter));
						},
					});
				});
			}
		});
	}

	//=== 03. Team Slider
	function teamSlider() {
		var slide = $('.team-member-slider');
		slide.slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 5000,
			speed: 500,
			arrows: false,
			fade: false,
			dots: false,
			swipe: true,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1
					}
				},
			]
		});
	}

	//=== 04. Testimonial Slider
	function testimoniSlider() {
		var slide = $('#testimonialSliderOne'),
			sliderTimer = 5000;
		slide.slick({
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: sliderTimer,
			speed: 600,
			arrows: false,
			fade: false,
			dots: false,
			swipe: true,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1
					}
				},
			]
		});

		var slide = $('#testimonialSliderTwo');
		slide.slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 5000,
			speed: 600,
			arrows: true,
			fade: false,
			dots: false,
			swipe: true,
			prevArrow: '<button class="slick-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
			nextArrow: '<button class="slick-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>'
		});
	}

	//=== 05. Brand Slider
	function brandSlider() {
		var slide = $('.brand-logos');
		slide.slick({
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 6000,
			speed: 500,
			arrows: false,
			fade: false,
			dots: false,
			swipe: true,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 2
					}
				},
			]
		});
	}

	//=== 06. Portfolio Slider
	function portfolioSlider() {
		var slide = $('.portfolio-slider');
		slide.slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 6000,
			speed: 500,
			arrows: false,
			fade: false,
			dots: false,
			swipe: true,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1
					}
				},
			]
		});
	}

	//=== 07. Progress Bar
	function progressBar() {
		$('.single-progress').on('inview', function (event, isInView) {
			if (isInView) {
				$.each($('.single-progress'), function () {
					var dataCount = $(this).attr('data-count'),
						count = $(this).find('.count'),
						progressbar = $(this).find('.progressbar');


					// set counter
					$({ Counter: 0 }).animate({
						Counter: dataCount
					}, {
						duration: 2000,
						easing: 'swing',
						step: function () {
							count.text(Math.ceil(this.Counter));
						},
					});

					// progressbar css
					progressbar.css('width', dataCount + '%');
				});
			}
		});
	}

	//=== 08. Easy Pie Chart
	function easyPieChart() {
		$('.single-pie-chart').on('inview', function (event, isInView) {
			if (isInView) {
				$('.chart').easyPieChart({
					scaleLength: 0,
					lineWidth: 10,
					trackWidth: 4,
					size: 120,
					lineCap: 'square',
					rotate: 360,
					trackColor: '#f4f4f4',
				});
			}
		});
	}

	//=== 09. Product Gallery
	function productGallery() {
		var slide = $('.main-gallery-image');
		slide.slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 5000,
			speed: 600,
			arrows: false,
			fade: false,
			dots: false,
			swipe: true,
			asNavFor: slideDots
		});
		var slideDots = $('.gallery-dots-slider');
		slideDots.slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 5000,
			speed: 600,
			arrows: false,
			fade: false,
			dots: false,
			swipe: true,
			asNavFor: slide,
			focusOnSelect: true,
			centerMode: true,
			centerPadding: '20px'
		});
	}

	//=== 10. Popup Video
	function popupVideo() {
		$('.popup-video').magnificPopup({
			type: 'iframe',
		});
	}

	//=== 11. Preloader
	function preloader() {
		if ($('#preloader').length) {
			$('#preloader').delay(300).fadeOut(500);
		}
	}

	//=== 12. Portdolio Isotope
	function portfolioIsotope() {
		var items = $('.portfolio-filter-items').isotope({
			percentPosition: true,
		});
		// items on button click
		$('.portfolio-filter ul').on('click', 'li', function () {
			var filterValue = $(this).attr('data-filter');
			items.isotope({
				filter: filterValue
			});
		});
		// menu active class
		$('.portfolio-filter li').on('click', function (event) {
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');
			event.preventDefault();
		});
	}

	//=== 13. Skillset Video SLider
	function skillsetVideoSlider() {
		var slide = $('.skillset-videos-slider');
		slide.slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 6000,
			speed: 500,
			arrows: false,
			fade: false,
			dots: false,
			swipe: true,
			centerMode: true,
			centerPadding: '25%',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 1,
						centerPadding: '20%',
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						centerPadding: '15%',
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
						centerPadding: '10%',
					}
				}
			]
		});
	}

	//=== 14. Sticky Header
	function stickyHeader() {
		var sticky = $('header.sticky-header');
		var scrollFromtop = $(window).scrollTop();
		var scrollLimit = $('header').height() + 10;

		if (scrollFromtop < scrollLimit) {
			sticky.removeClass('sticky-on');
		} else {
			sticky.addClass('sticky-on');
		}
	}

	//=== 15. Nice Select
	function niceSelect() {
		$('select').niceSelect()
	}

	/*---------------------
	=== DOCUMENT READY  ===
	----------------------*/
	$(document).ready(function () {
		mainMenu();
		teamSlider();
		progressBar();
		counterUp();
		testimoniSlider();
		brandSlider();
		portfolioSlider();
		easyPieChart();
		productGallery()
		popupVideo();
		portfolioIsotope();
		skillsetVideoSlider();
		niceSelect();
	});

	/*--------------------
	=== WINDOW SCROLL  ===
	----------------------*/
	$(window).on('scroll', function () {
		stickyHeader();
	});

	/*------------------
	=== WINDOW LOAD  ===
	--------------------*/
	$(window).on('load', function () {
		preloader();

		new WOW().init();
	});

})(jQuery);