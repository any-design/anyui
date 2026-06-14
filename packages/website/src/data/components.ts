// Single source of truth for the Components section.
//
// Drives the sidebar (ComponentsLayout), the landing grid (index.astro) and the
// individual component pages. Each entry maps a URL slug to its on-disk Markdown
// docs (English + Chinese) and its display metadata.
//
// Doc files live at: docs/components/<folder>/<Name>/<Name>_<English|Chinese>.md

export type Category =
  | 'form'
  | 'feedback'
  | 'display'
  | 'navigation'
  | 'overlay';

export interface CategoryMeta {
  id: Category;
  label: { en: string; zh: string };
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'form', label: { en: 'Form & Input', zh: '表单与输入' } },
  { id: 'feedback', label: { en: 'Feedback', zh: '反馈' } },
  { id: 'display', label: { en: 'Display', zh: '展示' } },
  { id: 'navigation', label: { en: 'Navigation', zh: '导航' } },
  { id: 'overlay', label: { en: 'Overlay & Utility', zh: '浮层与工具' } },
];

export interface ComponentEntry {
  /** URL slug, e.g. "button" → /components/button */
  slug: string;
  /** PascalCase component name without the A- prefix, e.g. "Button" → AButton */
  name: string;
  /** docs/components subfolder */
  folder: string;
  category: Category;
  /** Short blurb shown on the index grid */
  blurb: { en: string; zh: string };
}

export const COMPONENTS: ComponentEntry[] = [
  // ---- Form & Input ----
  {
    slug: 'input',
    name: 'Input',
    folder: 'input',
    category: 'form',
    blurb: {
      en: 'Text input with prefix/postfix adornments and slots.',
      zh: '文本输入框，支持前后缀装饰与插槽。',
    },
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    folder: 'textarea',
    category: 'form',
    blurb: {
      en: 'Auto-growing multiline text area.',
      zh: '自适应行高的多行文本框。',
    },
  },
  {
    slug: 'select',
    name: 'Select',
    folder: 'select',
    category: 'form',
    blurb: {
      en: 'Dropdown selector with single / multiple modes.',
      zh: '下拉选择器，支持单选与多选。',
    },
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    folder: 'checkbox',
    category: 'form',
    blurb: { en: 'Standalone checkbox control.', zh: '独立的复选框控件。' },
  },
  {
    slug: 'checkbox-group',
    name: 'CheckboxGroup',
    folder: 'checkboxGroup',
    category: 'form',
    blurb: {
      en: 'Group of checkboxes bound to an array value.',
      zh: '绑定数组值的复选框组。',
    },
  },
  {
    slug: 'radio',
    name: 'Radio',
    folder: 'radio',
    category: 'form',
    blurb: { en: 'Standalone radio control.', zh: '独立的单选框控件。' },
  },
  {
    slug: 'radio-group',
    name: 'RadioGroup',
    folder: 'radioGroup',
    category: 'form',
    blurb: { en: 'Group of radios bound to one value.', zh: '绑定单个值的单选框组。' },
  },
  {
    slug: 'radio-button-group',
    name: 'RadioButtonGroup',
    folder: 'radioButtonGroup',
    category: 'form',
    blurb: {
      en: 'Button-styled radio group, plus RadioButton.',
      zh: '按钮样式的单选组，含 RadioButton。',
    },
  },
  {
    slug: 'otp-input',
    name: 'OtpInput',
    folder: 'otpInput',
    category: 'form',
    blurb: {
      en: 'One-time-password code input with masked mode.',
      zh: '支持掩码的一次性验证码输入框。',
    },
  },
  {
    slug: 'form',
    name: 'Form',
    folder: 'form',
    category: 'form',
    blurb: {
      en: 'Validation-powered form container.',
      zh: '带校验能力的表单容器。',
    },
  },
  {
    slug: 'form-item',
    name: 'FormItem',
    folder: 'formItem',
    category: 'form',
    blurb: {
      en: 'Labeled field wrapper for Form.',
      zh: 'Form 中的带标签字段容器。',
    },
  },
  {
    slug: 'slider',
    name: 'Slider',
    folder: 'slider',
    category: 'form',
    blurb: { en: 'Numeric range slider with tooltip.', zh: '带提示的数值滑块。' },
  },

  // ---- Feedback ----
  {
    slug: 'alert',
    name: 'Alert',
    folder: 'alert',
    category: 'feedback',
    blurb: {
      en: 'Inline contextual message banner.',
      zh: '内联的上下文消息横幅。',
    },
  },
  {
    slug: 'message',
    name: 'Message',
    folder: 'message',
    category: 'feedback',
    blurb: {
      en: 'Imperative toast notifications (top-center).',
      zh: '命令式顶部居中通知。',
    },
  },
  {
    slug: 'toast',
    name: 'Toast',
    folder: 'toast',
    category: 'feedback',
    blurb: {
      en: 'Stackable corner notifications with imperative API.',
      zh: '可堆叠的角落通知，命令式调用。',
    },
  },
  {
    slug: 'loading',
    name: 'Loading',
    folder: 'loading',
    category: 'feedback',
    blurb: { en: 'Bouncing-dots loading indicator.', zh: '弹跳点加载指示器。' },
  },
  {
    slug: 'loading-mask',
    name: 'LoadingMask',
    folder: 'loadingMask',
    category: 'feedback',
    blurb: {
      en: 'Overlay a loading state on any content.',
      zh: '为任意内容覆盖加载状态。',
    },
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    folder: 'spinner',
    category: 'feedback',
    blurb: { en: 'Rotating icon spinner.', zh: '旋转图标的加载动画。' },
  },
  {
    slug: 'confirm-modal',
    name: 'ConfirmModal',
    folder: 'confirmModal',
    category: 'feedback',
    blurb: {
      en: 'Confirmation dialog with imperative helper.',
      zh: '确认对话框，含命令式调用。',
    },
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    folder: 'dialog',
    category: 'feedback',
    blurb: {
      en: 'Modal dialog with header / footer slots.',
      zh: '带 header / footer 插槽的模态对话框。',
    },
  },
  {
    slug: 'drawer',
    name: 'Drawer',
    folder: 'drawer',
    category: 'feedback',
    blurb: {
      en: 'Side panel that slides in from the edge.',
      zh: '从边缘滑入的侧边抽屉。',
    },
  },

  // ---- Display ----
  {
    slug: 'button',
    name: 'Button',
    folder: 'button',
    category: 'display',
    blurb: {
      en: 'The core button — types, sizes, icons, loading.',
      zh: '核心按钮 — 类型、尺寸、图标与加载态。',
    },
  },
  {
    slug: 'card',
    name: 'Card',
    folder: 'card',
    category: 'display',
    blurb: {
      en: 'Surface container with header / footer slots.',
      zh: '带 header / footer 插槽的卡片容器。',
    },
  },
  {
    slug: 'tag',
    name: 'Tag',
    folder: 'tag',
    category: 'display',
    blurb: { en: 'Compact labeled tag / chip.', zh: '紧凑的标签 / 胶囊。' },
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    folder: 'avatar',
    category: 'display',
    blurb: {
      en: 'User avatar with image, fallback and initials.',
      zh: '用户头像，支持图片、兜底与首字母。',
    },
  },
  {
    slug: 'image',
    name: 'Image',
    folder: 'image',
    category: 'display',
    blurb: {
      en: 'Lazy-loading image with loading / error slots.',
      zh: '懒加载图片，含加载 / 错误插槽。',
    },
  },
  {
    slug: 'gradient-text',
    name: 'GradientText',
    folder: 'gradientText',
    category: 'display',
    blurb: {
      en: 'Text painted with a brand gradient.',
      zh: '使用品牌渐变填充的文字。',
    },
  },
  {
    slug: 'clickable-text',
    name: 'ClickableText',
    folder: 'clickableText',
    category: 'display',
    blurb: { en: 'Themed link-styled text.', zh: '带主题色的可点击文字。' },
  },
  {
    slug: 'kbd',
    name: 'Kbd',
    folder: 'kbd',
    category: 'display',
    blurb: {
      en: 'Keyboard key indicator for shortcuts.',
      zh: '用于展示快捷键的按键标识。',
    },
  },
  {
    slug: 'item',
    name: 'Item',
    folder: 'item',
    category: 'display',
    blurb: {
      en: 'List item with media, title, description and actions.',
      zh: '带媒体、标题、描述与操作的列表项。',
    },
  },
  {
    slug: 'table',
    name: 'Table',
    folder: 'table',
    category: 'display',
    blurb: {
      en: 'Data table with per-column cell slots.',
      zh: '支持按列自定义单元格的数据表格。',
    },
  },
  {
    slug: 'empty',
    name: 'Empty',
    folder: 'empty',
    category: 'display',
    blurb: { en: 'Empty-state placeholder.', zh: '空状态占位组件。' },
  },
  {
    slug: 'masonry',
    name: 'Masonry',
    folder: 'masonry',
    category: 'display',
    blurb: {
      en: 'Virtualized masonry / waterfall layout.',
      zh: '虚拟化的瀑布流布局。',
    },
  },

  // ---- Navigation ----
  {
    slug: 'pagination',
    name: 'Pagination',
    folder: 'pagination',
    category: 'navigation',
    blurb: {
      en: 'Page navigation with sibling / boundary counts.',
      zh: '分页导航，可配置兄弟与边界数量。',
    },
  },
  {
    slug: 'step',
    name: 'Step',
    folder: 'step',
    category: 'navigation',
    blurb: { en: 'Horizontal step indicator.', zh: '横向步骤指示器。' },
  },
  {
    slug: 'list-menu',
    name: 'ListMenu',
    folder: 'listMenu',
    category: 'navigation',
    blurb: {
      en: 'Selectable vertical menu (optionally grouped).',
      zh: '可选中的纵向菜单（可分组）。',
    },
  },
  {
    slug: 'list-view',
    name: 'ListView',
    folder: 'listView',
    category: 'navigation',
    blurb: {
      en: 'Bordered / borderless list container with items.',
      zh: '带边框 / 无边框的列表容器与列表项。',
    },
  },
  {
    slug: 'layout',
    name: 'Layout',
    folder: 'layout',
    category: 'navigation',
    blurb: {
      en: 'Header / Content / Footer / Side layout primitives.',
      zh: 'Header / Content / Footer / Side 布局原语。',
    },
  },
  {
    slug: 'dropdown-menu',
    name: 'DropdownMenu',
    folder: 'dropdownMenu',
    category: 'navigation',
    blurb: {
      en: 'Rich dropdown menu with icons, dividers, danger.',
      zh: '功能丰富的下拉菜单：图标、分隔、危险态。',
    },
  },
  {
    slug: 'popup-menu',
    name: 'PopupMenu',
    folder: 'popupMenu',
    category: 'navigation',
    blurb: {
      en: 'Lightweight context menu built on Popper.',
      zh: '基于 Popper 的轻量右键菜单。',
    },
  },

  // ---- Overlay & Utility ----
  {
    slug: 'tooltip',
    name: 'Tooltip',
    folder: 'tooltip',
    category: 'overlay',
    blurb: { en: 'Hover / click tooltip bubble.', zh: '悬停 / 点击的提示气泡。' },
  },
  {
    slug: 'popper',
    name: 'Popper',
    folder: 'popper',
    category: 'overlay',
    blurb: {
      en: 'Low-level positioning primitive (Popper.js).',
      zh: '底层定位原语（Popper.js）。',
    },
  },
  {
    slug: 'popup',
    name: 'Popup',
    folder: 'popup',
    category: 'overlay',
    blurb: {
      en: 'Centered modal popup with optional mask.',
      zh: '居中的模态弹层，可选遮罩。',
    },
  },
  {
    slug: 'float',
    name: 'Float',
    folder: 'float',
    category: 'overlay',
    blurb: {
      en: 'Floating panel that docks to the viewport edge.',
      zh: '停靠在视口边缘的浮动面板。',
    },
  },
  {
    slug: 'scroll-area',
    name: 'ScrollArea',
    folder: 'scrollArea',
    category: 'overlay',
    blurb: {
      en: 'Scrollable region with custom height / max-height.',
      zh: '可自定义高度 / 最大高度的滚动区域。',
    },
  },
  {
    slug: 'split',
    name: 'Split',
    folder: 'split',
    category: 'overlay',
    blurb: { en: 'Horizontal divider line.', zh: '横向分割线。' },
  },
  {
    slug: 'virtual-list',
    name: 'VirtualList',
    folder: 'virtualList',
    category: 'overlay',
    blurb: {
      en: 'High-performance virtualized list.',
      zh: '高性能虚拟列表。',
    },
  },
  {
    slug: 'upload',
    name: 'Upload',
    folder: 'upload',
    category: 'overlay',
    blurb: {
      en: 'Drag-and-drop / click file surface (emits File).',
      zh: '拖拽 / 点击的文件上传区（输出 File）。',
    },
  },
  {
    slug: 'chat',
    name: 'Chat',
    folder: 'chat',
    category: 'overlay',
    blurb: {
      en: 'Auto-scrolling chat transcript (built on VirtualList).',
      zh: '自动滚动的聊天记录（基于 VirtualList）。',
    },
  },
  {
    slug: 'collapse',
    name: 'Collapse',
    folder: 'collapse',
    category: 'overlay',
    blurb: {
      en: 'Expand / collapse transition wrapper.',
      zh: '展开 / 收起过渡包装器。',
    },
  },
];

export function componentsByCategory(): Array<{ category: CategoryMeta; items: ComponentEntry[] }> {
  return CATEGORIES.map((category) => ({
    category,
    items: COMPONENTS.filter((c) => c.category === category.id),
  }));
}

export function getComponent(slug: string): ComponentEntry | undefined {
  return COMPONENTS.find((c) => c.slug === slug);
}
