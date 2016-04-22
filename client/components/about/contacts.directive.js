'use strict';

angular.module('meanApp')
  .directive('contacts', function() {
    return {
      template: '<div class="contact__info"><div class="content__title">контакты</div><ul class="contact__list"><li><i class="fa fa-map-marker"></i> Украина, г. Одесса, ул Дерибасовская 1а</li><li><i class="fa fa-phone"></i>099 12-34-567, 067 123-45-67</li><li><i class="fa fa-envelope-o"></i>minesko@gmail.com</li><li><i class="fa fa-skype"></i>MineskoSv.</li><li><i class="fa fa-instagram"></i>minesko-inst</li><li><ul class="contact__socials"><li><a href="#"><i class="fa fa-vk"></i></a></li><li><a href="#"><i class="fa fa-google-plus"></i></a></li><li><a href="#"><i class="fa fa-facebook"></i></a></li><li><a href="#"><i class="fa fa-youtube"></i></a></li></ul></li></ul></div>',
      restrict: 'E',
	  	controller: function () {
	  		return false; 
	  	},
   		controllerAs: 'contacts'
    };
  });