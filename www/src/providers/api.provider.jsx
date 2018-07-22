import $ from 'jquery';

import * as setup from '../setup';
import { subject } from './subject.provider';


export const exchange = (options) => {
    return new Promise((resolve, reject) => {
        fetch(options).then(
            status => status.errcode ? resolve(status.data) : alert(status.message),
            error => (options.errorText && alert(options.errorText)) || reject(error)
        );
    });
}

export const fetch = (options) => {
    let animate = _animate(options.animate);
    animate = animate ? subject(animate.subject) : undefined;
    animate && animate.next({ type: 'push', content: animate.message });
    options = _options(options);
    return new Promise((resolve, reject) => {
        $.ajax(options).done(status => (animate && animate.next({ type: 'pop' })) || resolve(status)).fail(error => (animate && animate.next({ type: 'pop' })) || reject(error));
    });
}

export const _animate = (animate) => {
    if (animate == undefined || (typeof animate == 'boolean' && animate)) {
        animate = { subject: setup.components.loading.subject, message: setup.components.loading.message };
    } else if (typeof animate == 'string') {
        animate = { subject: animate, message: setup.components.loading.message };
    }
    animate && !animate.subject && (animate.subject = setup.components.loading.subject);
    animate && !animate.message && (animate.subject = setup.components.loading.message);
    return animate;
}

export const _options = (options) => {
    options.url = setup.apiURL(options.url);
    if (!options.contentType) {
        options.contentType = 'application/json;charset=UTF-8';
        options.data && (options.data = JSON.stringify(options.data));
    }
    !options.timeout && (options.timeout = setup.ajax.timeout);
    !options.dataType && (options.dataType = 'json');
    return options;
}