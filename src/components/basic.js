'use strict';

import h from 'snabbdom/h';

function selector(tag, id, classes) {
  return tag + (id ? '#' + id : '') + (classes ? '.' + classes.join('.') : '');
};

function attributes() {
  return Array.from(arguments).reduce((acc, curr) => {
    if(curr.value !== undefined) {
      acc[curr.attr] = curr.value;
    }
    return acc;
  }, {});
};

function events() {
  return Array.from(arguments).reduce((acc, curr) => {
    if(curr.func) {
      acc[curr.event] = curr.func;
    }
    return acc;
  }, {});
};

export function a(model) {
  const href = model.href || '#';
  const sel = selector('a', model.id, model.classes);
  const attrs = attributes({
    attr: 'href',
    value: href
  },{
    attr: 'target',
    value: model.target
  });
  
  return h(sel, { attrs: attrs }, model.children);
};

export function img(model) {
  const sel = selector('img', model.id, model.classes);
  const attrs = attributes({
    attr: 'src',
    value: model.src
  },{
    attr: 'alt',
    value: model.alt
  });
  
  return h(sel, { attrs: attrs }, model.children);
};

function label(model) {
  const sel = selector('label');
  const attrs = attributes({
    attr: 'for',
    value: model.for
  });

  return h(sel, { attrs: attrs }, model.text);
};

export function inputCheckbox(model) {
  const attrs = attributes({
    attr: 'type',
    value: 'checkbox'
  },{
    attr: 'name',
    value: model.name
  }, {
    attr: 'value',
    value: model.value
  }, {
    attr: 'checked',
    value: true
  });

  return generalInput(model, attrs);
};

export function inputNumber(model) {
  const attrs = attributes({
    attr: 'type',
    value: 'number'
  }, {
    attr: 'name',
    value: model.name
  }, {
    attr: 'value',
    value: model.value
  }, {
    attr: 'min',
    value: model.min
  }, {
    attr: 'required',
    value: null
  });

  return generalInput(model, attrs);
};

function inputSubmit(model) {
  const attrs = attributes({
    attr: 'type',
    value: 'submit'
  }, {
    attr: 'value',
    value: model.value
  });

  return generalInput(model, attrs);
};

export function inputText(model) {
  const attrs = attributes({
    attr: 'type',
    value: 'text'
  },{
    attr: 'name',
    value: model.name
  }, {
    attr: 'value',
    value: model.value
  }, {
    attr: 'required',
    value: null
  });

  return generalInput(model, attrs);
};

function generalInput(model, attrs)
{
  const sel = selector('input', model.id, model.classes);

  if(!model.label) {
    return h(sel, { attrs: attrs, on: model.on });
  }

  return h('div', [
    label({ for: model.id, text: model.label }),
    h(sel, { attrs: attrs, on: model.on })
  ]);
};

export function option(model) {
  const sel = selector('option', model.id, model.classes);
  const attrs = attributes({
    attr: 'value',
    value: model.value
  });
  return h(sel, {attrs: attrs}, model.text);
};

export function select(model) {
  const sel = selector('select', model.id, model.classes);
  return h(sel, model.children);  
};

export function form(model) {
  
  const sel = selector('form', model.id, model.classes);

  if(model.submit) {
    const submit = inputSubmit({
      value: model.submitText || 'Report',
      id: 'submitReport',
      on:{'click': model.submitReport }
    });
    model.children.push(submit);
  }

  if(model.submit) {
	    const submit = inputSubmit({
	      value: model.submitTextDashboard || 'Dashboard',
	      id: 'submitDashboard',
	      on:{'click': model.submitDashboard }
	});
	model.children.push(submit);
  }
  
  return h(sel, {}, model.children);
};

export function div(model) {
  const sel = selector('div', model.id, model.classes);
  return h(sel, {}, model.children);
};

export function paragraph(model) {
  const sel = selector('p', model.id, model.classes);
  return h(sel, {}, model.text);
};

export function progressBar(model) {
  const sel = selector('progress', model.id, model.classes);
  const attrs = attributes({
    attr: 'value',
    value: model.value
  },{
    attr: 'max',
    value: 100
  });
  return h(sel, {attrs: attrs}, model.text);
};