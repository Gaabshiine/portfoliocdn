/* ===================================================================
    
    Author          : Valid Theme
    Template Name   : Antux - Personal Portfolio Template
    Version         : 1.0
    
* ================================================================= */
(function($) {
	"use strict";

	$(document).ready(function() {



		/* ==================================================
		    # Tooltip Init
		===============================================*/
		$('[data-toggle="tooltip"]').tooltip();


		/* ==================================================
		    # Youtube Video Init
		 ===============================================*/
		$('.player').mb_YTPlayer();


		/* ==================================================
		    # Wow Init
		 ===============================================*/
		var wow = new WOW({
			boxClass: 'wow', // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset: 0, // distance to the element when triggering the animation (default is 0)
			mobile: true, // trigger animations on mobile devices (default is true)
			live: true // act on asynchronously loaded content (default is true)
		});
		wow.init();


		/* ==================================================
		    # imagesLoaded active
		===============================================*/
		$('#gallery-masonary,.blog-masonry').imagesLoaded(function() {

			/* Filter menu */
			$('.mix-item-menu').on('click', 'button', function() {
				var filterValue = $(this).attr('data-filter');
				$grid.isotope({
					filter: filterValue
				});
			});

			/* filter menu active class  */
			$('.mix-item-menu button').on('click', function(event) {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
				event.preventDefault();
			});

			/* Filter active */
			var $grid = $('#gallery-masonary').isotope({
				itemSelector: '.gallery-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.gallery-item',
				}
			});

			/* Filter active */
			$('.blog-masonry').isotope({
				itemSelector: '.blog-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.blog-item',
				}
			});

		});


		/* ==================================================
		    # Magnific popup init
		 ===============================================*/
		$(".popup-link").magnificPopup({
			type: 'image',
			// other options
		});

		$(".popup-gallery").magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			},
			// other options
		});

		$(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
			type: "iframe",
			mainClass: "mfp-fade",
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});

		$('.magnific-mix-gallery').each(function() {
			var $container = $(this);
			var $imageLinks = $container.find('.item');

			var items = [];
			$imageLinks.each(function() {
				var $item = $(this);
				var type = 'image';
				if ($item.hasClass('magnific-iframe')) {
					type = 'iframe';
				}
				var magItem = {
					src: $item.attr('href'),
					type: type
				};
				magItem.title = $item.data('title');
				items.push(magItem);
			});

			$imageLinks.magnificPopup({
				mainClass: 'mfp-fade',
				items: items,
				gallery: {
					enabled: true,
					tPrev: $(this).data('prev-text'),
					tNext: $(this).data('next-text')
				},
				type: 'image',
				callbacks: {
					beforeOpen: function() {
						var index = $imageLinks.index(this.st.el);
						if (-1 !== index) {
							this.goTo(index);
						}
					}
				}
			});
		});


		/* ==================================================
		    # Fun Factor Init
		===============================================*/
		$('.timer').countTo();
		$('.fun-fact').appear(function() {
			$('.timer').countTo();
		}, {
			accY: -100
		});


		$(".service-style-one-item").hover(function() {
			$(this).addClass('active').parent().siblings().find('.service-style-one-item').removeClass('active');
		});

		/* ==================================================
            # Expertise Carousel
         ===============================================*/
		const expertiseCarousel = new Swiper(".expertise-carousel", {
			// Optional parameters
			loop: true,
			slidesPerView: 1,
			spaceBetween: 30,
			autoplay: true,
			speed: 1000,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
			},
		});


		/* ==================================================
            # Testimonials Carousel
         ===============================================*/
		const testimonialOneCarousel = new Swiper(".testimonial-style-one-carousel", {
			// Optional parameters
			direction: "horizontal",
			loop: true,
			autoplay: true,
			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
			},

			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			}

			// And if we need scrollbar
			/*scrollbar: {
            el: '.swiper-scrollbar',
          },*/
		});


		/* ==================================================
		    Circle Text
		================================================== */
		let circleTypeElm = $(".circle-text-item");
		if (circleTypeElm.length) {
			circleTypeElm.each(function() {
				let elm = $(this);
				let options = elm.data("circle-text-options");
				elm.circleType(
					"object" === typeof options ? options : JSON.parse(options)
				);
			});
		}


		/* ==================================================
		    GSAP Element Scroll Animation
		================================================== */

		let upDown_Scroll = document.querySelector(".upDownScrol");
		if (upDown_Scroll) {
			gsap.set(".upDownScrol", {
				yPercent: 105
			});

			gsap.to(".upDownScrol", {
				yPercent: -105,
				ease: "none",
				scrollTrigger: {
					trigger: ".upDownScrol",
					end: "bottom center",
					scrub: 1
				},
			});
		}

		// Images parallax
		var width = $(window).width();
		if (width > 1023) {
			let imageParallax = document.querySelector(".img-container");
			if (imageParallax) {
				gsap.utils.toArray('.img-container').forEach(container => {
					const img = container.querySelector('img');

					const t4 = gsap.timeline({
						scrollTrigger: {
							trigger: container,
							scrub: true,
							pin: false,
						}
					});

					t4.fromTo(img, {
						yPercent: -60,
						ease: 'none'
					}, {
						yPercent: 60,
						ease: 'none'
					});
				});
			}
		}


		/* ==================================================
		    Contact Form Validations
		================================================== */
		$('.contact-form').each(function() {
			var formInstance = $(this);
			formInstance.submit(function() {

				var action = $(this).attr('action');

				$("#message").slideUp(750, function() {
					$('#message').hide();

					$('#submit')
						.after('<img src="assets/img/ajax-loader.gif" class="loader" />')
						.attr('disabled', 'disabled');

					$.post(action, {
							name: $('#name').val(),
							email: $('#email').val(),
							phone: $('#phone').val(),
							comments: $('#comments').val()
						},
						function(data) {
							document.getElementById('message').innerHTML = data;
							$('#message').slideDown('slow');
							$('.contact-form img.loader').fadeOut('slow', function() {
								$(this).remove()
							});
							$('#submit').removeAttr('disabled');
						}
					);
				});
				return false;
			});
		});


	}); // end document ready function


	$(window).scroll(function() {
		/* ==================================================
		    Background Zoom Init
		================================================== */
		let background_Zoom = document.querySelector("#js-hero");
		if (background_Zoom) {
			var scroll = $(window).scrollTop();
			$("#js-hero").css({
				width: (100 + scroll / 18) + "%"
			})
		}
	});



	// Preloader Js
	const svg = document.getElementById("preloaderSvg");
	const svgText = document.querySelector(
		".hero-section .intro_text svg text"
	);
	const tl = gsap.timeline({
		onComplete: startStrokeAnimation,
	});
	const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
	const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

	tl.to(".preloader-heading .load-text , .preloader-heading .cont", {
		delay: 1.5,
		y: -100,
		opacity: 0,
	});
	tl.to(svg, {
		duration: 0.5,
		attr: { d: curve },
		ease: "power2.easeIn",
	}).to(svg, {
		duration: 0.5,
		attr: { d: flat },
		ease: "power2.easeOut",
	});
	tl.to(".preloader", {
		y: -1500,
	});
	tl.to(".preloader", {
		zIndex: -1,
		display: "none",
	});

	function startStrokeAnimation() {
		if (svgText) {
			// Add a class or directly apply styles to trigger the stroke animation
			svgText.classList.add("animate-stroke");
		}
	}


})(jQuery); // End jQuery