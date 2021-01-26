var $uploadCrop,
tempFilename,
rawImg,
imageId;

function readFile(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			//$('.upload-demo').addClass('ready');
			$('#cropImagePop').modal('show'); //Id del modal a mostrar
			rawImg = e.target.result;
		}
		reader.readAsDataURL(input.files[0]);
	}
	else {
		swal("Sorry - you're browser doesn't support the FileReader API");
	}
}

$uploadCrop = $('#upload-demo').croppie({
	viewport: {
		width: 150,
		height: 200,
	},
	enforceBoundary: false,
	enableExif: true
});

$('#cropImagePop').on('shown.bs.modal', function(){
	// alert('Shown pop');
	$uploadCrop.croppie('bind', {
		url: rawImg
	}).then(function(){
		console.log('jQuery bind complete');
	});
});

$('.th-btn-file').on('change', function () { 
	imageId = $(this).data('id'); tempFilename = $(this).val();
	var wrapFile = $(this).attr('data-img');
	var sizeFileWidth = $(this).attr('data-size-width');
	var sizeFileHeight = $(this).attr('data-size-height');
	var modalClass = $(this).attr('data-modal');
	$('#cropImagePop').addClass(modalClass);

	$('#cancelCropBtn').data('id', imageId); readFile(this); 
	$('#cropImageBtn').attr({
	  'data-file': wrapFile,
	  'data-size-width': sizeFileWidth,
	  'data-size-height': sizeFileHeight,
	  'data-modal-class': modalClass
	});
});

$('#cropImageBtn').on('click', function (ev) {
	var idFile = $(this).attr('data-file');
	var sizeWidth = $(this).attr('data-size-width');
	var sizeHeight = $(this).attr('data-size-height');
	var modalClassActive = $(this).attr('data-modal-class');

	$uploadCrop.croppie('result', {
		type: 'base64',
		format: 'jpeg',
		size: {width: sizeWidth, height: sizeHeight}
	}).then(function (resp) {
		$('#'+idFile).attr('src', resp);
		$('#cropImagePop').modal('hide').removeClass(modalClassActive);
	});
});
// End upload preview image