// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    QuestionView.prototype.template = Handlebars.compile($("#question-tpl").html());
    ResultView.prototype.template = Handlebars.compile($("#result-tpl").html());

    var slider = new PageSlider($('body'));

    var questionService = new QuestionService();
    var answerService = new AnswerService();
    var wageService = new WageService();

    $.when([questionService.initialize(), answerService.initialize(), wageService.initialize()]).done(function() {
      router.addRoute('', function() {
          slider.slidePage(new HomeView(answerService).render().$el);
      });

      router.addRoute('results', function() {
        answerService.getAnswers().done(function(answers) {
          wageService.findByAnswers(answers).done(function(wageIntervals) {
            slider.slidePage(new ResultView(wageIntervals).render().$el);
            $('.results-table').readmore({
                collapsedHeight: 130,
                moreLink: "<button class=\"btn btn-block btn-primary btn-contrast\">See more future wages...</button>",
                lessLink: "<button class=\"btn btn-block btn-primary btn-contrast\">Hide</button>"
            });
          });
        });
      });

      router.addRoute('question/:id', function(id) {
          questionService.findById(id).done(function(question) {
            slider.slidePage(new QuestionView(question, answerService).render().$el);
          });
      });

      router.start();
    });

    /* --------------------------------- Event Registration -------------------------------- */

    if ('addEventListener' in document) {
      document.addEventListener('deviceready', function () {
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#ffffff');
        StatusBar.styleDefault();

        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
      }, false);
    }

    FastClick.attach(document.body);
}());
