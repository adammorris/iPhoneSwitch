/************************************************ 
*  jQuery iphoneSwitch plugin                   *
*                                               *
*  Author: Ammon Casey		                    *
*  Website: http://www.brokenparadigmlabs.com	*
*  Twitter: @ammonkc							*
*  Date:   08.10.2010                           *
************************************************/

jQuery.fn.iphoneSwitch = function(start_state, switched_on_callback, switched_off_callback, options) {

	var state = start_state == 'on' ? start_state : 'off';
	
	// define default settings
	var settings = {
		mouse_over: 'pointer',
		mouse_out:  'default',
		hide_checkbox: true,
		sync_checkbox: true,
		use_images: true,
		speed: '300',
		on_label: 'On',
		off_label: 'Off',
		switch_height: 28,
		switch_width: 93,
		switch_radius: 3,
		track_img: 'images/switch_track.png',
		track_bg_color: '#5f6777',
		track_width: 93,
		track_height: 27,
		handle_img: 'images/switch_handle.png',
		handle_bg_color: '#f9f9f9',
		handle_border_color: '#d0d0d0',
		handle_height: 25,
		handle_width: 37,
		label_color: "#ffffff",
		label_font_size: 12
	};

	if(options) {
		jQuery.extend(settings, options);
	}

	// create the switch
	return this.each(function() {
		var checkbox = jQuery(this);
		if (!jQuery(checkbox).is(':checkbox')) { return; }
		
		var container;
		var track;
		var handle;
		var offset = (settings.track_width - 1) - settings.handle_width;
		
		// Hide the checkbox
		if (settings.hide_checkbox) {checkbox.hide();}
		
		// sync checkbox state with switch state
		if (settings.sync_checkbox) {state = checkbox.attr('checked') == true ? 'on' : 'off';}
		
		var left = (state == 'on' ? offset : '1');
		var right = (state == 'on' ? '1' : offset);
		
		// use images 
		if (settings.use_images) {
			track_bg = 'url('+settings.track_img+')';
			handle_bg = 'url('+settings.handle_img+')';
		}else{
			track_bg = settings.track_bg_color;
			handle_bg = settings.handle_bg_color;
		}
		/**** make the container ****/
		container = jQuery('<div />')
		                .addClass('switch-container')
		                .css({
		                    'height':settings.switch_height,
		                    'width':settings.switch_width,
		                    'position':'relative',
		                    'overflow':'hidden',
		                    'font':"normal normal normal 12px/18px 'Lucida Grande', Verdana, sans-serif"
		                    });
		/**** make the track ****/
		track = jQuery('<div />')
		            .addClass('track')
		            .css({
		                'height':settings.track_height,
		                'width':settings.track_width,
		                'position':'absolute',
		                'background-image':track_bg,						
		                'background-repeat':'no-repeat'					
		                });
		
		/**** Make the handle ****/
		handle = jQuery('<div />')
		            .addClass('handle')
		            .css({
		                'height':settings.handle_height,
		                'width':settings.handle_width,
		                'left':left,
		                'right':right,
		                'top':1,
		                'bottom':1,
		                'position':'absolute',
		                'background-image':handle_bg,
		                'background-repeat':'no-repeat'						
		                });
		
		/**** Make the labels ****/
		label_on = jQuery('<span />')
		                .addClass('label')
		                .addClass('left')
		                .text(settings.on_label)
		                .css({
		                    'height':settings.handle_height,
		                    'width':settings.handle_width,
		                    'line-height':settings.track_height + 'px',
		                    'color':settings.label_color,
		                    'font-size':settings.label_font_size,
		                    'text-align':'center',
		                    'text-shadow':'#333 0px 1px 0px',
		                    'float':'left'	                    
		                    });
		label_off = jQuery('<span />')
		                .addClass('label')
		                .addClass('right')
		                .text(settings.off_label)
		                .css({
		                    'height':settings.handle_height,
		                    'width':settings.handle_width,
		                    'line-height':settings.track_height + 'px',
		                    'color':settings.label_color,
		                    'font-size':settings.label_font_size,
		                    'text-align':'center',
		                    'text-shadow':'#333 0px 1px 0px',
		                    'position':'absolute',
		                    'top':1,
		                    'right':1,
		                    'bottom':1	                    
		                    });
		// use images 
		if (!settings.use_images) {
			track.css({
					'background-color':settings.track_bg_color,
					'-webkit-border-radius':settings.switch_radius,
					'-moz-border-radius':settings.switch_radius,
					'border-radius':settings.switch_radius,
					'-webkit-box-shadow':'rgba(255, 255, 255, 0.15) 0px 1px 1px, rgba(1, 1, 1, 0.65) 0px 3px 6px inset',
					'-moz-box-shadow':'rgba(255, 255, 255, 0.15) 0px 1px 1px, rgba(1, 1, 1, 0.65) 0px 3px 6px inset',
					'box-shadow':'rgba(255, 255, 255, 0.15) 0px 1px 1px, rgba(1, 1, 1, 0.65) 0px 3px 6px inset',
					'-webkit-background-clip':'padding-box'
					});
			handle.css({
					'background-color':settings.handle_bg_color,
					'background-image':'-webkit-gradient(linear, 0% 0%, 0% 100%, from(#bbb), to(#fff))',
					'background-image':'-moz-linear-gradient(-90deg, #bbb, #fff)',
					'-webkit-border-radius':settings.switch_radius,
					'-moz-border-radius':settings.switch_radius,
					'border-radius':settings.switch_radius,
					'-webkit-box-shadow':'rgba(255,255,255,1) 0px 0px 3px inset',
					'-moz-box-shadow':'rgba(255,255,255,1) 0px 0px 3px inset',
					'box-shadow':'rgba(255,255,255,1) 0px 0px 3px inset',
					'-webkit-background-clip':'padding-box'
					});
		}
		
		/* insert into placeholder */
		checkbox.wrap(container);
		track.append(label_on)
		     .append(label_off)
		     .append(handle);
		checkbox.after(track);
		
		var mySwitch = checkbox.parent();
		
		// click handling
		jQuery(mySwitch).find('.handle').click(function() {
			if(state == 'on') {
				$(this).animate({left: 1,right: offset}, settings.speed, function() {
					switched_off_callback();
				});
				checkbox.attr('checked',false);
				state = 'off';
			}else {
				$(this).animate({left: offset,right: 1}, settings.speed, function() {
					switched_on_callback();
				});
				checkbox.attr('checked',true);
				state = 'on';
			}
		});		

	});
	
}