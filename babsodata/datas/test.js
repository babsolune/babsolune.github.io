jQuery(function(){

	var filemanager = jQuery('.file-manager'),
		breadcrumbs = jQuery('.breadcrumbs'),
		dataList = filemanager.find('.data-manager');

	// Start by fetching the file data from scan.php with an AJAX request

	jQuery.get('scan.php', function(data) {

		var response = [data],
			currentPath = '',
			breadcrumbsUrls = [];

		var folders = [],
			files = [];

		// This event listener monitors changes on the URL. We use it to
		// capture back/forward navigation in the browser.
		jQuery(window).on('hashchange', function() {

			goto(window.location.hash);

			// We are triggering the event. This will execute
			// this function on page load, so that we show the correct folder:

		}).trigger('hashchange');


		// Hiding and showing the search box
		filemanager.find('.search').click(function() {

			var search = jQuery(this);

			search.find('span').hide();
			search.find('input[type=search]').show().focus();

		});


		// Listening for keyboard input on the search field.
		// We are using the "input" event which detects cut and paste
		// in addition to keyboard input.
		filemanager.find('input').on('input', function(e) {

			folders = [];
			files = [];

			var value = this.value.trim();

			if(value.length) {

				filemanager.addClass('searching');

				// Update the hash on every key stroke
				window.location.hash = 'search=' + value.trim();

			}

			else {

				filemanager.removeClass('searching');
				window.location.hash = encodeURI(currentPath);

			}

		}).on('keyup', function(e){

			// Clicking 'ESC' button triggers focusout and cancels the search

			var search = jQuery(this);

			if(e.keyCode == 27) {

				search.trigger('focusout');

			}

		}).focusout(function(e){

			// Cancel the search

			var search = jQuery(this);

			if(!search.val().trim().length) {

				window.location.hash = encodeURI(currentPath);
				search.hide();
				search.parent().find('span').show();

			}

		});

		// Clicking on folders
		dataList.on('click', 'li.folders', function(e) {
			e.preventDefault();

			var nextDir = jQuery(this).data('path');

			if(filemanager.hasClass('searching')) {

				// Building the breadcrumbs

				breadcrumbsUrls = generateBreadcrumbs(nextDir);

				filemanager.removeClass('searching');
				filemanager.find('input[type=search]').val('').hide();
				filemanager.find('span').show();
			}
			else {
				breadcrumbsUrls.push(nextDir);
			}

			window.location.hash = encodeURI(nextDir);
			currentPath = nextDir;
		});

        // Copy link to clipboard
        dataList.on('click', '.copy-link-to-clipboard', function(e){
            e.preventDefault();
            var siteUri = window.location.href.split('#').slice(0, -1),
                hrefValue = siteUri + jQuery(this).attr('href');

            document.addEventListener('copy', function(el) {
				el.clipboardData.setData('text/plain', hrefValue);
				el.preventDefault();
			}, true);
			document.execCommand('copy');
			alert('URL :' +'\n' + hrefValue);
        });

        // Open target in modal
        dataList.on('click', '.modal', function(e) {
            e.preventDefault();

            var siteUri = window.location.href.split('#').slice(0, -1),
                hrefValue = siteUri + jQuery(this).attr('href'),
                data = jQuery(this).data('modal');

            jQuery('#file-viewer').addClass('show-file');

            jQuery('<span/>', {id : 'close-modal', 'aria-label' : 'Close', text : 'X'}).appendTo('#file-viewer');

            if (data != 'picture-file' && data != 'media-file') {
                const content = jQuery(this).data('content');
                jQuery('<div/>', {text : content}).appendTo('#file-viewer');
            }
            else if (data == 'picture-file') {
                jQuery('<img/>', {src : hrefValue}).appendTo('#file-viewer');
            }
            else if (data == 'media-file') {
                jQuery('<video/>', {controls : 'true', id : 'video'}).appendTo('#file-viewer');
                jQuery('<source/>', {src : hrefValue}).appendTo('#video');
            }

            // close modal
            jQuery('#close-modal').on('click', function() {
                jQuery('#file-viewer').removeClass('show-file').html('');
            });
        });

		// Clicking on breadcrumbs
		breadcrumbs.on('click', 'a', function(e) {
			e.preventDefault();

			var index = breadcrumbs.find('a').index(jQuery(this)),
				nextDir = breadcrumbsUrls[index];

			breadcrumbsUrls.length = Number(index);

			window.location.hash = encodeURI(nextDir);

		});

		// Navigates to the given hash (path)
		function goto(hash) {

			hash = decodeURI(hash).slice(1).split('=');

			if (hash.length) {
				var rendered = '';

				// if hash has search in it
				if (hash[0] === 'search') 
                {

					filemanager.addClass('searching');
					rendered = searchData(response, hash[1].toLowerCase());

					if (rendered.length) {
						currentPath = hash[0];
						render(rendered);
					}
					else {
						render(rendered);
					}
				}
				// if hash is some path
				else if (hash[0].trim().length) 
                {
					rendered = searchByPath(hash[0]);
					if (rendered.length)
                    {
						currentPath = hash[0];
						breadcrumbsUrls = generateBreadcrumbs(hash[0]);
						render(rendered);
					}
					else {
						currentPath = hash[0];
						breadcrumbsUrls = generateBreadcrumbs(hash[0]);
						render(rendered);
					}

				}

				// if there is no hash

				else {
					currentPath = data.path;
					breadcrumbsUrls.push(data.path);
					render(searchByPath(data.path));
				}
			}
		}

		// Splits a file path and turns it into clickable breadcrumbs
		function generateBreadcrumbs(nextDir) {
			var path = nextDir.split('/').slice(0);
			for(var i=1;i<path.length;i++){
				path[i] = path[i-1]+ '/' +path[i];
			}
			return path;
		}

		// Locates a file by path
		function searchByPath(dir) {
			var path = dir.split('/'),
				demo = response,
				flag = 0;

			for(var i=0;i<path.length;i++){
				for(var j=0;j<demo.length;j++){
					if(demo[j].name === path[i]){
						flag = 1;
						demo = demo[j].items;
						break;
					}
				}
			}

			demo = flag ? demo : [];
			return demo;
		}

		// Recursively search through the file tree
		function searchData(data, searchTerms) {

			data.forEach(function(d){
				if(d.type === 'folder') {

					searchData(d.items,searchTerms);

					if(d.name.toLowerCase().match(searchTerms)) {
						folders.push(d);
					}
				}
				else if(d.type === 'file') {
					if(d.name.toLowerCase().match(searchTerms)) {
						files.push(d);
					}
				}
			});
			return {folders: folders, files: files};
		}

		// Render the HTML for the file manager
		function render(data) {

			var scannedFolders = [],
				scannedFiles = [];

			if(Array.isArray(data)) {

				data.forEach(function (d) {

					if (d.type === 'folder') {
						scannedFolders.push(d);
					}
					else if (d.type === 'file') {
						scannedFiles.push(d);
					}

				});

			}
			else if(typeof data === 'object') {

				scannedFolders = data.folders;
				scannedFiles = data.files;

			}

			// Empty the old result and make the new one
			dataList.empty().hide();

			if(!scannedFolders.length && !scannedFiles.length) {
				filemanager.find('.nothingfound').show();
			}
			else {
				filemanager.find('.nothingfound').hide();
			}

            // Build the folder list
            if(scannedFolders.length) {
                var folderList = jQuery('<ul/>', {class: 'folder-datas'}).appendTo(dataList);

				scannedFolders.forEach(function(f) {

					var itemsLength = f.items.length,
						name = escapeHTML(f.name),
						icon = '<i class="far fa-4x fa-folder" aria-hidden="true"></i>';

					if(itemsLength) {
						icon = '<i class="fa fa-4x fa-folder aria-hidden="true""></i>';
					}

					if(itemsLength == 1) {
						itemsLength += ' object';
					}
					else if(itemsLength > 1) {
						itemsLength += ' objects';
					}
					else {
						itemsLength = 'Empty';
					}

					var folder = jQuery(
                        '<li class="folders" data-path="' + f.path + '">'
                            + icon
                            + '<div class="folder-infos">'
                                + '<div class="folder-name">' + name + '</div>'
                                + '<div class="folder-details">' + itemsLength + '</div>'
                            + '</div>'
                        + '</li>');
					folder.appendTo(folderList);
				});

			}

            // Build the file list
			if(scannedFiles.length) {
                var fileList = jQuery('<ul/>', {class: 'file-datas'}).appendTo(dataList);

				scannedFiles.forEach(function(f) {

					var fileSize = bytesToSize(f.size),
						name = escapeHTML(f.name),
						fileExt = name.split('.'),
						isPicture = '',
                        fileStyle = '',
                        fileContent = '',
                        viewLink = '';

					fileExt = fileExt[fileExt.length-1];

                    var pictureFiles = ['jpg', 'png', 'gif', 'bmp', 'webp'];
                    var archiveFiles = ['gz', 'tar', 'rar', 'zip', '7z'];
                    var codeFiles = ['css', 'scss', 'saas', 'html', 'tpl', 'js', 'jsx', 'xml', 'xhtml'];
                    var mediaFiles = ['mp4', 'mp3', 'ogg', 'mkv', 'webm', 'aac', 'avi', 'mpg', 'mpeg', 'm4v', 'm4a', 'wav'];

					if (jQuery.inArray(fileExt, pictureFiles) !== -1) {
						isPicture = 'style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(' + f.path + ') ;"';
                        fileBg = '';
                        fileStyle = 'picture-file';
                        viewLink = '<a data-modal="' + fileStyle + '" href="' + f.path + '" aria-label="view" class="modal"><i class="fa fa-lg fa-eye" aria-hidden="true"></i></a>';
					}
					else if (jQuery.inArray(fileExt, archiveFiles) !== -1) {
                        fileStyle = 'archive-file';
                        viewLink = '<span></span>';
					}
					else if (jQuery.inArray(fileExt, codeFiles) !== -1) {
                        fileContent = f.content;
                        fileStyle = 'code-file';
                        viewLink = '<a data-content="' + fileContent + '" data-modal="' + fileStyle + '" href="' + f.path + '" aria-label="view" class="modal"><i class="fa fa-lg fa-eye" aria-hidden="true"></i></a>';
					}
					else if (jQuery.inArray(fileExt, mediaFiles) !== -1) {
                        fileStyle = 'media-file';
                        viewLink = '<a data-modal="' + fileStyle + '" href="' + f.path + '" aria-label="view" class="modal"><i class="fa fa-lg fa-eye" aria-hidden="true"></i></a>';
					}
					else {
                        fileStyle = 'other-file';
                        viewLink = '<a data-modal="' + fileStyle + '" href="' + f.path + '" aria-label="view" class="modal"><i class="fa fa-lg fa-eye" aria-hidden="true"></i></a>';
					}

					var file = jQuery(
                        '<li class="files ' + fileStyle + '" ' + isPicture + '>'
                            + '<div class="file-infos">'
                                + '<div class="file-name">' + name + '</div>'
                                + '<div class="file-between"><span class="file-ext">' + fileSize + '</span><span class="date">' + f.date + '</span></div>'
                                + '<div class="file-between">'
                                    + '<a href="' + f.path + '" aria-label="download" download><i class="fa fa-lg fa-download" aria-hidden="true"></i></a>'
                                    + '<a href="' + f.path + '" aria-label="copy link" class="copy-link-to-clipboard"><i class="fa fa-lg fa-clipboard" aria-hidden="true"></i></a>'
                                    + viewLink
                                + '</div>'
                            + '</div>'
                        + '</li>');
					file.appendTo(fileList);
				});
			}

			// Generate the breadcrumbs

			var url = '';

			if(filemanager.hasClass('searching')){

				url = '<span>Résultats de la recherche : </span>';
				dataList.removeClass('animated');

			}
			else {

				// dataList.addClass('animated');

				breadcrumbsUrls.forEach(function (u, i) {

					var name = u.split('/');

					if (i !== breadcrumbsUrls.length - 1) {
						url += '<a href="' + u + '"><span class="foldername">' + name[name.length-1] + '</span></a> <span class="arrow">/</span> ';
					}
					else {
						url += '<span class="foldername">' + name[name.length-1] + '</span>';
					}

				});

			}

			breadcrumbs.text('').append(url);

			// Show the generated elements

			dataList.show();

		}

		// Escapes special html characters in names
		function escapeHTML(text) {
			return text.replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;');
		}

		// Convert file sizes from bytes to human readable units
		function bytesToSize(bytes) {
			var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			if (bytes == 0) return '0 Bytes';
			var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
			return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
		}

	});
});
