// Libs
import 'angular-animate';
import 'angular-meteor';
import 'angular-meteor-auth';
import 'angular-moment';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import { Meteor } from 'meteor/meteor';

// Modules
import ChatsCtrl from '../controllers/chats.controller';
import ChatCtrl from '../controllers/chat.controller';
import LoginCtrl from '../controllers/login.controller';
import ConfirmationCtrl from '../controllers/confirmation.controller';
import ProfileCtrl from '../controllers/profile.controller';
import SettingsCtrl from '../controllers/settings.controller';
import NewChatCtrl from '../controllers/new-chat.controller';
import ChatNameFilter from '../filters/chat-name.filter';
import ChatPictureFilter from '../filters/chat-picture.filter';
import NewChatService from '../services/new-chat.service';
import InputDirective from '../directives/input.directive';
import CalendarFilter from '../filters/calendar.filter';
import Routes from '../routes';

const App = 'Whatsapp';

//App

Angular.module(App, [
  'angular-meteor',
  'angularMoment',
  'angular-meteor.auth',
  'ionic'
]);

new Loader(App)
  .load(ChatsCtrl)
  .load(ChatCtrl)
  .load(LoginCtrl)
  .load(ConfirmationCtrl)
  .load(ProfileCtrl)
  .load(SettingsCtrl)
  .load(NewChatCtrl)
  .load(ChatNameFilter)
  .load(ChatPictureFilter)
  .load(NewChatService)
  .load(InputDirective)
  .load(CalendarFilter)
  .load(Routes);

//Startup
if (Meteor.isCordova) {
  Angular.element(document).on('deviceready', onReady);
}
else {
  Angular.element(document).ready(onReady);
}
 
function onReady() {
  Angular.bootstrap(document, [App]);
}
