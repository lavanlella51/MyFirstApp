import { LightningElement, api } from 'lwc';

export default class ChildInvokedFromAura extends LightningElement {
    value = 'inProgress';
    @api showCancelModal = false;

    connectedCallback(){
        console.log('------connectedCallback----');
    }

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }

    handleClose(){
        const value = this.value;
        const valueChangeEvent = new CustomEvent("valuechange", {
            detail: { value }
        });
        // Fire the custom event
        this.dispatchEvent(valueChangeEvent);
    }
}