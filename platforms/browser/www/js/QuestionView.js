var QuestionView = function(question, answerService) {

  this.initialize = function() {
      this.$el = $('<div/>');
      this.$el.on('click', '.answer', this.saveAnswer);
  };

  this.saveAnswer = function(event) {
      var questionId = $(event.target).data('question-id');
      var value = $(event.target).data('value');

      answerService.saveAnswer(questionId, value);
  };

  this.render = function() {
      this.$el.html(this.template(question));
      return this;
  };

  this.initialize();
}
