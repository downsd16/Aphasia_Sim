function commonDocReady() {
  if ($('#sim-input').length>0) {  
    $('#sim-input').focus();
  }


  if ($('#answers .images').length>0) {
    $('#answers .images li').hover(function() {
      $(this).addClass('hover');
    }, function() {
      $(this).removeClass('hover');
    });
  }
  
  
  if ($('.test-b').length>0) {
    $('#answers').hide();
    $('#page').text(' ');
    
    $('#next-step').click(function(){
			    $('#task').hide();
			    $('#answers').fadeIn();
			    $('#page').text('1 of 10');
			    $('#next-step span').text('Next');
			    $('#instruction').text('Try to answer questions below');
			  });
    
  }
}


function setupListeningSim1Question(question) {
  jwplayer().load({file: question.audio_url});
  $('#img1, #img2').removeClass('correct-answer wrong-answer correct wrong');
  if (Math.random() > .5) {
    $('#img1').addClass('correct-answer').find('img').fadeOut('slow', function() {
        $(this).attr('src', question.correct_image_url).fadeIn();
      });
    $('#img2').addClass('wrong-answer').find('img').fadeOut('slow', function() {
        $(this).attr('src', question.wrong_image_url).fadeIn();
	  });
	
  } else {
    $('#img2').addClass('correct-answer').find('img').fadeOut('slow', function() {
		$(this).attr('src', question.correct_image_url).fadeIn();
	  });
    $('#img1').addClass('wrong-answer').find('img').fadeOut('slow', function() {
		$(this).attr('src', question.wrong_image_url).fadeIn();
	  });
  }
  
  $('#sim-current-count').html(CURRENT_QUESTION);

  $('.correct-answer, .wrong-answer').find('a').css('cursor', 'pointer');

  $('#quick-desc').hide().html(question.description);
  
  // correct/wrong images are randomly assigned to the img1/img2 so we have to unbind and bind every time this is done
  $('.correct-answer').unbind('click').click(function() {
					$(this).addClass('correct');
					$('.correct-answer, .wrong-answer').find('a').css('cursor', 'default');
					$('.correct-answer, .wrong-answer').unbind('click').click(function() {
												    return false;
         });
					$('#quick-desc').fadeIn();
					return false;
				      });
  
  $('.wrong-answer').unbind('click').click(function() {
				      $(this).addClass('wrong');
				      $('.correct-answer, .wrong-answer').find('a').css('cursor', 'default');
				      $('.correct-answer, .wrong-answer').unbind('click').click(function() {
												  return false;
												});
				      $('#quick-desc').fadeIn();
				      return false;
				    });


}

function listeningSim1DocReady(nextUrl) {
  setupListeningSim1Question(questionsData.questions[0]);
  $('#sim-total-count').html(questionsData.questions.length);

  $('#play-button').click(function() {
			    if (jwplayer().getState() == "PLAYING") {
			      jwplayer().stop();
			      $(this).removeClass('pause');
			    } else {
			      $(this).addClass('pause');
			      jwplayer().play();
			    }
			    
			    return false;
			  });
  
  // next button
  $(".next").click(function() {
		     CURRENT_QUESTION++;
		     if (CURRENT_QUESTION <= questionsData.questions.length) {
		       setupListeningSim1Question(questionsData.questions[CURRENT_QUESTION-1]);
		       if (CURRENT_QUESTION == questionsData.questions.length) {
			 $('.next').children().html("Next Simulation");
		       }

		       // re-enable clicks
		     } else {
		       document.location='listening-impairments-simulation-2.html';
		     }
		     
		     return false;
		   });
  commonDocReady();
}



function listeningSim2DocReady() {
  $('#play-button').click(function() {
			     if (jwplayer().getState() == "PLAYING") {
			       jwplayer().stop();
			       $(this).removeClass('pause');
			     } else {
			       $(this).addClass('pause');
			       jwplayer().play();
			     }

			     return false;
			   });
  
  $('.correct-answer').click(function() {
			       $(this).addClass('sim-correct');
			       $(this).parent().parent().find('a').unbind('click').css('cursor', 'default').click(function() { return false; });
			       return false;
			     });

  $('.wrong-answer').click(function() {
			       $(this).addClass('sim-wrong');
			       $(this).parent().parent().find('a').unbind('click').css('cursor', 'default').click(function() { return false; });
			       return false;
			     });

  commonDocReady();
}



function setupReadingSim1Question(question) {
  $('.question').html(question.text);
  $('#img1, #img2').removeClass('correct-answer wrong-answer correct wrong');
  if (Math.random() > .5) {
    $('#img1').addClass('correct-answer').find('img').fadeOut('slow', function() {
        $(this).attr('src', question.correct_image_url).fadeIn();
      });
    $('#img2').addClass('wrong-answer').find('img').fadeOut('slow', function() {
        $(this).attr('src', question.wrong_image_url).fadeIn();
	  });
  } else {
    $('#img2').addClass('correct-answer').find('img').fadeOut('slow', function() {
		$(this).attr('src', question.correct_image_url).fadeIn();
	  });
    $('#img1').addClass('wrong-answer').find('img').fadeOut('slow', function() {
		$(this).attr('src', question.wrong_image_url).fadeIn();
	  });
  }
  
  $('#sim-current-count').html(CURRENT_QUESTION);
  $('#quick-desc').hide().html(question.description);

  $('.correct-answer, .wrong-answer').find('a').css('cursor', 'pointer');


  
  // correct/wrong images are randomly assigned to the img1/img2 so we have to unbind and bind every time this is done
  $('.correct-answer').unbind('click').click(function() {
					       $(this).addClass('correct');
					       $('.correct-answer, .wrong-answer').find('a').css('cursor', 'default');
					       $('#quick-desc').fadeIn();
					       $('.correct-answer, .wrong-answer').unbind('click').click(function() {
													   return false;
													 });
					       return false;
					     });
  
  $('.wrong-answer').unbind('click').click(function() {
					     $(this).addClass('wrong');
					     $('.correct-answer, .wrong-answer').find('a').css('cursor', 'default');
					     $('#quick-desc').fadeIn();
					     $('.correct-answer, .wrong-answer').unbind('click').click(function() {
													 return false;
												       });
					     return false;
					   });
  
}

function readingSim1DocReady() {
  setupReadingSim1Question(questionsData.questions[0]);
  $('#sim-total-count').html(questionsData.questions.length);

  // next button
  $(".next").click(function() {
		     CURRENT_QUESTION++;
		     if (CURRENT_QUESTION <= questionsData.questions.length) {
		       setupReadingSim1Question(questionsData.questions[CURRENT_QUESTION-1]);
		       if (CURRENT_QUESTION == questionsData.questions.length) {
			 $('.next').children().html("Next Simulation");
		       }

		       // re-enable clicks
		     } else {
		       document.location='reading-impairments-simulation-2.html';
		     }
		     
		     return false;
		   });
  commonDocReady();
}

function readingSim2DocReady() {
  $('.task-read').hide();
  $('.next').hide();
  $('#answers').hide();
  $('.start-button').click(function() {
			    $(this).hide();
			    $('#directions').html("Read the paragraph, silently to yourself.");
			    $('.task-read').fadeIn('slow').delay(20000).queue(function() {
										$('#directions').html("Answer the questions by clicking on the best answer.");
										$('.task-read').hide();
										$('#answers').fadeIn('slow');
										$('#quick-desc').fadeIn('slow');
    									           $('.next').show();

									      });
			    return false;
			    
	      });

   $('.correct-answer').click(function() {
			       $(this).addClass('sim-correct');
			       $(this).parent().parent().find('a').unbind('click').css('cursor', 'default').click(function() { return false; });
			       return false;
			     });

  $('.wrong-answer').click(function() {
			       $(this).addClass('sim-wrong');
			       $(this).parent().parent().find('a').unbind('click').css('cursor', 'default').click(function() { return false; });
			       return false;
			     });

  commonDocReady();
}



function setupWritingSim1Question(question) {
  $('#image').fadeOut().attr('src', question.image_url).fadeIn('slow');
  $('#sim-current-count').html(CURRENT_QUESTION);
  $('#sim-input').val('').focus();
}

function writingSim1DocReady() {
  setupWritingSim1Question(questionsData.questions[0]);
  $('#sim-total-count').html(questionsData.questions.length);

  // next button
  $(".next").click(function() {
		     CURRENT_QUESTION++;
		     if (CURRENT_QUESTION <= questionsData.questions.length) {
		       setupWritingSim1Question(questionsData.questions[CURRENT_QUESTION-1]);
		       if (CURRENT_QUESTION == questionsData.questions.length) {
			 $('.next').children().html('Next Simulation');
		       }

		       // re-enable clicks
		     } else {
		       document.location=NEXT_URL;
		     }
		     
		     return false;
		   });

  $('#sim-input').keyup(function() {
			  //			     alert($('#sim-input').val());
			  var text=$('#sim-input').val();
			  var correct_word = questionsData.questions[CURRENT_QUESTION-1].correct_word;
			  var confused_word = questionsData.questions[CURRENT_QUESTION-1].confused_word;

			  $('#sim-input').val(confused_word.substring(0, text.length));
			   });
  commonDocReady();
}


function setupWritingSim3Question(question) {
  $('#image').fadeOut().attr('src', question.image_url).fadeIn('slow');
  $('#sim-current-count').html(CURRENT_QUESTION);
  $('#sim-input-long').val('').focus();
  $('#typed-text').html('&nbsp;');
}


function writingSim3DocReady() {
  setupWritingSim3Question(questionsData.questions[0]);
  $('#sim-total-count').html(questionsData.questions.length);

  // next button
  $(".next").click(function() {
		     CURRENT_QUESTION++;
		     if (CURRENT_QUESTION <= questionsData.questions.length) {
		       setupWritingSim3Question(questionsData.questions[CURRENT_QUESTION-1]);
		       if (CURRENT_QUESTION == questionsData.questions.length) {
			 $('.next').children().html("Communication Tips");
		       }

		       // re-enable clicks
		     } else {
		       document.location='writing-impairments-communication-tips.html';
		     }
		     
		     return false;
		   });

  $('#sim-input-long').keyup(function() {
			  //			     alert($('#sim-input').val());
			  var text=$('#sim-input-long').val();
			  var newtext = text.replace(/\b(the|a|an|was|were|are|is|am|have|has|been|on|under|below|above|on|at|off|of|)\b|/gi, '');
			  $('#typed-text').html(newtext);
			   });
  commonDocReady();
}

function setupSpeakingSim1Question(question) {
  $('#image').fadeOut().attr('src', question.image_url).fadeIn('slow');
  $('#sim-current-count').html(CURRENT_QUESTION);
}



function speakingSim1DocReady(nextUrl) {
  setupSpeakingSim1Question(questionsData.questions[0]);
  $('#sim-total-count').html(questionsData.questions.length);

  jwplayer().load({file: questionsData.questions[0].audio_url});
  $('#img1').click(function() {
		     jwplayer().play();
		     return false;
		   });

  // next button
  $(".next").click(function() {
		     CURRENT_QUESTION++;
		     if (CURRENT_QUESTION <= questionsData.questions.length) {
		       setupSpeakingSim1Question(questionsData.questions[CURRENT_QUESTION-1]);
		       jwplayer().load({file: questionsData.questions[CURRENT_QUESTION-1].audio_url});

		       if (CURRENT_QUESTION == questionsData.questions.length) {
			 $('.next').children().html("Next Simulation");
		       }

		       // re-enable clicks
		     } else {
		       document.location=nextUrl;
		     }
		     return false;
		   });

  commonDocReady();
}
