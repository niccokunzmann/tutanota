// @flow
import m from "mithril"
import {Button} from "../gui/base/Button"
import {assertMainOrNode} from "../api/Env"
import {ActionBar} from "../gui/base/ActionBar"
import MessageBox from "../gui/base/MessageBox"
import {lang} from "../misc/LanguageViewModel"
import {Icons} from "../gui/base/icons/Icons"
import {ContactView} from "./ContactView"

assertMainOrNode()

/**
 * The ContactViewer displays the action buttons for multiple selected contacts.
 */
export class MultiContactViewer {
	view: Function;
	_contactView: ContactView

	constructor(contactView: ContactView) {
		this._contactView = contactView
		let emptyMessageBox = new MessageBox(() => this._getContactSelectionMessage(contactView))
		let actionBar = this.createActionBar()
		this.view = () => {
			return [
				m(".fill-absolute.mt-xs.plr-l",
					(contactView._contactList && contactView._contactList.list.getSelectedEntities().length > 0) ? [
						m(".button-height"), // just for the margin
						m(".flex-space-between", [
							m(".flex.items-center", this._getContactSelectionMessage(contactView)),
							m(actionBar)
						])
					] : [m(emptyMessageBox)])
			]
		}
	}

	// Contact Export May Come Soon
	// _exportAll(contacts: Contact[]) {
	// 	Promise.map(contacts, contact => load(MailBodyTypeRef, mail.body).then(body => {
	// 		return exportAsEml(contact, htmlSanitizer.sanitize(body.text, false).text)
	// 	}), {concurrency: 5})
	// }

	_getContactSelectionMessage(contactView: ContactView) {
		var nbrOfSelectedContacts = (contactView._contactList) ? contactView._contactList.list.getSelectedEntities().length : 0
		if (nbrOfSelectedContacts === 0) {
			return lang.get("noContact_msg")
		} else {
			return lang.get("nbrOfContactsSelected_msg", {"{1}": nbrOfSelectedContacts})
		}
	}

	createActionBar(actionCallback: () => void = () => {}): Component {
		const actions = new ActionBar()
		actions.add(new Button('delete_action',
			() => this._contactView._deleteSelected().then(actionCallback), () => Icons.Trash))
		actions.add(new Button("merge_action", () => this._contactView.mergeSelected().then(actionCallback),
			() => Icons.People)
			.setIsVisibleHandler(() => this._contactView._contactList.list.getSelectedEntities().length === 2))
		return actions
	}
}
