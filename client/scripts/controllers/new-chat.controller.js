import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';

export default class NewChatCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.helpers({
      users() {
        return Meteor.users.find({ _id: { $ne: this.currentUser }});
      }
    });
  }

  newChat(userId) {
    let chat = Chats.findOne( { userIds: { $all: [this.currentUserId, userId] }});

    if (chat) {
      this.hideNewChatModal();
      return this.goToChat(chat._id);
    }

    this.callMethod('newChat', userId, (err, chatId) => {
      this.hideNewChatModal();
      if (err) return this.handleError(err);
      this.goToChat(chatId);
    });
  }

  hideNewChatModal() {
    this.NewChat.hideModal();
  }

  goToChat(chatId) {
    this.$state.go('tab.chat', { chatId });
  }

  handleError(err) {
    this.$log.error('New Chat Creation Error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'New Chat Creation Failed',
      template: 'Please try again',
      okType: 'button-positive button-clear',
    });
  }

}

NewChatCtrl.$name = 'NewChatCtrl';
NewChatCtrl.$inject = ['$state', 'NewChat', '$log', '$ionicPopup'];
