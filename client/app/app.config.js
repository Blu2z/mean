(function(angular, undefined) {
  angular.module("meanApp.config", [])

.value("modalConfig", {
	modalAsk: false
});

// angular.module('textAngular', [])

// .value('taOptions',  {
// 	forceTextAngularSanitize: true,
// 	keyMappings : [],
// 	toolbar: [
// 		['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
// 		['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
// 		['justifyLeft','justifyCenter','justifyRight','justifyFull','indent','outdent'],
// 		['html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
// 	],
// 	classes: {
// 		focussed: "focussed",
// 		toolbar: "btn-toolbar",
// 		toolbarGroup: "btn-group",
// 		toolbarButton: "btn btn-default",
// 		toolbarButtonActive: "active",
// 		disabled: "disabled",
// 		textEditor: 'form-control',
// 		htmlEditor: 'form-control'
// 	},
// 	defaultTagAttributes : {
// 		a: {target:""}
// 	},
// 	setup: {
// 		textEditorSetup: function($element){ /* Do some processing here */ },
// 		htmlEditorSetup: function($element){ /* Do some processing here */ }
// 	},
// 	defaultFileDropHandler: function(file, insertAction){
// 			var reader = new FileReader();
// 			if(file.type.substring(0, 5) === 'image'){
// 				reader.onload = function() {
// 					if(reader.result !== '') insertAction('insertImage', reader.result, true);
// 				};

// 				reader.readAsDataURL(file);
				
// 				return true;
// 			}
// 			return false;
// 		}
// });

})(angular);