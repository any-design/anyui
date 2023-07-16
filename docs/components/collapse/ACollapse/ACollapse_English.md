# @any-design/anyui: Collapse Component

## Introduction

The `@any-design/anyui` collapse component provides the functionality of hiding expanded content on user interactions. When the user performs an interaction, the component collapses, hiding the hierarchy information. 

## Basic Usage

You can start using the `@any-design/anyui` collapse component by importing it as shown below:

```javascript
import ACollapse from '@any-design/anyui/lib/ACollapse';
```
After importing, you can use it in your Vue application or component as shown below:
```html
<template>
  <!-- Required tags for Collapse -->
  <a-collapse :visible="isExpanded">
    <div>
      <h2>This is the header of the content</h2>
      <p>This is the main content which will be hidden on collapse</p>
    </div>
  </a-collapse>
</template>
```
The first tag required for the collapse is the `a-collapse` tag. You should enclose the content you want to hide with `a-collapse` tag. The `visible` attribute is used to control whether the content is visible or hidden by default. If `visible` is set to `true`, the default content of the tag will be visible on the page. If `visible` is set to `false`, the content of the tag will be hidden on the page.

## Props

The `@any-design/anyui` collapse component includes the following props:

| Name  | Type     | Options/Default | Description                                         |
|-------|----------|-----------------|-----------------------------------------------------|
| visible  | Boolean | false           | The initial visibility state of the collapse content|
| direction | String | 'vertical'      | the direction of the collapse, can be 'horizontal' or 'vertical'. |
| alwaysRender | Boolean | false           | If true, the collapse will not be destroyed when it is collapsed.   |
| renderWaitTime | Number | 100 | A render delay after the value changed, in milliseconds. |

## Events

The `@any-design/anyui` collapse component does not emit any events.

## Exposed Methods and Values

The `@any-design/anyui` collapse component doesn't expose any methods or values. 

**Note:**
The `@any-design/anyui` collapse component's internal styles are not used in the documentation as per the rule. Therefore, you can check the component library's internal styles when using it in your application.

**Example:** You can expand and collapse the header and content of every section of the user interface on any event or interaction. The layout will contract or expand, showing or hiding the relevant content, as per the interaction.