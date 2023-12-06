---
title: Multipage apps
slug: /library/get-started/multipage-apps
---

# Multipage apps

As apps grow large, it becomes useful to organize them into multiple pages. This makes the app easier to manage as a developer and easier to navigate as a user. Streamlit provides a frictionless way to create multipage apps. Pages are automatically shown in a nice navigation widget inside the app sidebar, and clicking on a page will navigate to the page without reloading the frontend — making app browsing incredibly fast!
随着应用程序变得越来越大，将它们组织成多个页面变得很有用。 这使得应用程序更易于开发人员管理，也更易于用户导航。 Streamlit 提供了一种创建多页面应用程序的无摩擦方式。 页面会自动显示在应用程序侧边栏中一个漂亮的导航小部件中，单击页面将导航到该页面，而无需重新加载前端 - 使应用程序浏览速度异常快！

We created a "single-page app" to explore a public Uber dataset for pickups and drop-offs in New York City on the [previous page](/library/get-started/create-an-app). In this guide, let’s learn how to create multipage apps. Once we have a solid foundation on what it takes to create multipage apps, let’s build one for ourselves in the [next section](/library/get-started/multipage-apps/create-a-multipage-app)!
我们创建了一个“单页应用程序”来探索上一页上纽约市接送服务的公共 Uber 数据集。 在本指南中，我们将学习如何创建多页面应用程序。 一旦我们对创建多页面应用程序有了坚实的基础，让我们在下一节中为自己构建一个！

## Structuring multipage apps

Let's understand what it takes to create multipage apps — including how to define pages, structure and run multipage apps, and navigate between pages in the user interface. Once you've understood the basics, you can jump right into the [next section](/library/get-started/multipage-apps/create-a-multipage-app) to convert the familiar `streamlit hello` command into a multipage app!
让我们了解创建多页面应用程序需要什么，包括如何定义页面、构建和运行多页面应用程序以及如何在用户界面中的页面之间导航。 一旦您了解了基础知识，您就可以直接跳到下一部分，将熟悉的 Streamlit hello 命令转换为多页应用程序！

## Run a multipage app

Running a multipage app is identical to running a single-page app. The command to run a multipage app is:

```python
streamlit run [entrypoint file]
```

The "entrypoint file" is the first page the app will show to the user. Once you have added pages to your app, the entrypoint file appears as the top-most page in the sidebar. You can think of the entrypoint file as your app's "main page". For example, say your entrypoint file is `Home.py`. Then, to run your app, you can run `streamlit run Home.py`. This will start your app and execute the code in `Home.py`.
“入口点文件”是应用程序将向用户显示的第一页。 将页面添加到应用程序后，入口点文件将显示为侧栏中最顶部的页面。 您可以将入口点文件视为应用程序的“主页”。 例如，假设您的入口点文件是 Home.py。 然后，要运行您的应用程序，您可以运行streamlit run Home.py。 这将启动您的应用程序并执行 Home.py 中的代码。

## Adding pages

Once you've created your entrypoint file, you can add pages by creating `.py` files in a `pages/` directory relative to your entrypoint file. For example, if your entrypoint file is `Home.py`, then you can create a `pages/About.py` file to define the "About" page. Here's a valid directory structure for a multipage app:

```
Home.py # This is the file you run with "streamlit run"
└─── pages/
  └─── About.py # This is a page
  └─── 2_Page_two.py # This is another page
  └─── 3_😎_three.py # So is this
```

<Tip>

When adding emojis to filenames, it’s best practice to include a numbered-prefix to make autocompletion in your terminal easier. Terminal-autocomplete can get confused by unicode (which is how emojis are represented).
将表情符号添加到文件名时，最佳做法是包含编号前缀，以便更轻松地在终端中自动完成。 终端自动完成功能可能会被 unicode（表情符号的表示方式）混淆。

</Tip>

Pages are defined as `.py` files in a `pages/` directory. The filenames of pages are transformed to page names in the sidebar based on the the rules in the [section below](#how-pages-are-labeled-and-sorted-in-the-ui). For example, the `About.py` file will appear as "About" in the sidebar, `2_Page_two.py` appears as "Page two", and `3_😎_three.py` appears as “😎 three":

![Directory structure](/images/mpa-add-pages.png)

Only `.py` files in the `pages/` directory will be loaded as pages. Streamlit ignores all other files in the `pages/` directory and subdirectories.

## How pages are labeled and sorted in the UI

Page labels in the sidebar UI are generated from filenames. They may differ from the page title set in [`st.set_page_config`](/library/api-reference/utilities/st.set_page_config). Let's learn what constitutes a valid filename for a page, how pages are displayed in the sidebar, and how pages are sorted.
侧边栏 UI 中的页面标签是根据文件名生成的。 它们可能与 st.set_page_config 中设置的页面标题不同。 让我们了解什么构成页面的有效文件名、页面在侧边栏中如何显示以及页面如何排序。

### Valid filenames for pages

Filenames are composed of four different parts:
文件名由四个不同的部分组成：

1. A `number` — if the file is prefixed with a number.
   数字 — 如果文件带有数字前缀。

2. A separator — could be `_`, `-`, space, or any combination thereof.
   分隔符 — 可以是 _、-、空格或其任意组合。

3. A `label` — which is everything up to, but not including, `.py`.
   标签 — 包含 .py 的所有内容，但不包括 .py。

4. The extension — which is always `.py`.
   扩展名 — 始终为 .py。

### How pages are displayed in the sidebar

What is displayed in the sidebar is the `label` part of the filename:
侧边栏中显示的是文件名的标签部分：

- If there's no `label`, Streamlit uses the `number` as the label.
  如果没有标签，Streamlit 将使用数字作为标签。

- In the UI, Streamlit beautifies the `label` by replacing `_` with space.
  在UI中，Streamlit通过将_替换为空格来美化标签。

### How pages are sorted in the sidebar

Sorting considers numbers in the filename to be actual numbers (_integers_):
排序将文件名中的数字视为实际数字（整数）：

- Files that have a `number` appear before files without a `number`.
  有编号的文件出现在没有编号的文件之前。

- Files are sorted based on the `number` (if any), followed by the `title` (if any).
  文件根据编号（如果有）排序，后跟标题（如果有）。

- When files are sorted, Streamlit treats the `number` as an actual number rather than a string. So `03` is the same as `3`.
  对文件进行排序时，Streamlit 会将数字视为实际数字而不是字符串。 所以 03 与 3 相同。

This table shows examples of filenames and their corresponding labels, sorted by the order in which they appear in the sidebar.
此表显示文件名及其相应标签的示例，按它们在侧栏中出现的顺序排序。

**Examples**:

| **Filename**              | **Rendered label** |
| :------------------------ | :----------------- |
| `1 - first page.py`       | first page         |
| `12 monkeys.py`           | monkeys            |
| `123.py`                  | 123                |
| `123_hello_dear_world.py` | hello dear world   |
| `_12 monkeys.py`          | 12 monkeys         |

<Tip>

Emojis can be used to make your page names more fun! For example, a file named `🏠_Home.py` will create a page titled "🏠 Home" in the sidebar.

</Tip>

## Navigating between pages
在页面之间导航

Pages are automatically shown in a nice navigation UI inside the app's sidebar. When you click on a page in the sidebar UI, Streamlit navigates to that page without reloading the entire frontend — making app browsing incredibly fast!
页面会自动显示在应用程序侧边栏中漂亮的导航 UI 中。 当您单击侧边栏 UI 中的页面时，Streamlit 会导航到该页面，而无需重新加载整个前端 - 使应用程序浏览速度变得异常快！

You can also navigate between pages using URLs. Pages have their own URLs, defined by the file's `label`. When multiple files have the same `label`, Streamlit picks the first one (based on the ordering [described above](/library/get-started/multipage-apps#how-pages-are-sorted-in-the-sidebar)). Users can view a specific page by visiting the page's URL.
您还可以使用 URL 在页面之间导航。 页面有自己的 URL，由文件的标签定义。 当多个文件具有相同标签时，Streamlit 会选择第一个文件（基于上述顺序）。 用户可以通过访问页面的 URL 来查看特定页面。

If a user tries to access a URL for a page that does not exist, they will see a modal like the one below, saying the user has requested a page that was not found in the app’s pages/ directory.
如果用户尝试访问不存在的页面的 URL，他们将看到如下所示的模式，表示用户请求了在应用程序的页面/目录中找不到的页面。

<Image src="/images/mpa-page-not-found.png" />

## Notes

- Pages support [magic commands](https://docs.streamlit.io/library/api-reference/write-magic/magic).
  页面支持魔法命令。

- Pages support run-on-save. Additionally, when you save a page, this causes a rerun for users currently viewing that exact page.
  页面支持保存时运行。 此外，当您保存页面时，这会导致当前查看该页面的用户重新运行。

- Adding or deleting a page causes the UI to update immediately.
  添加或删除页面会导致 UI 立即更新。

- Updating pages in the sidebar does not rerun the script.
  更新侧边栏中的页面不会重新运行脚本。

- `st.set_page_config` works at the page level. When you set a title or favicon using [st.set_page_config](/library/api-reference/utilities/st.set_page_config), this applies to the current page only.
  st.set_page_config 在页面级别工作。 当您使用 st.set_page_config 设置标题或图标时，这仅适用于当前页面。

- Pages share the same Python modules globally:
  页面在全局范围内共享相同的 Python 模块：

  ```python
  # page1.py
  import foo
  foo.hello = 123

  # page2.py
  import foo
  st.write(foo.hello)  # If page1 already executed, this should write 123
  ```

- Pages share the same [st.session_state](https://docs.streamlit.io/library/advanced-features/session-state):

  ```python
  # page1.py
  import streamlit as st
  if "shared" not in st.session_state:
     st.session_state["shared"] = True

  # page2.py
  import streamlit as st
  st.write(st.session_state["shared"])
  # If page1 already executed, this should write True
  ```

You now have a solid understanding of multipage apps. You've learned how to structure apps, define pages, and navigate between pages in the user interface. It's time to [create your first multipage app](/library/get-started/multipage-apps/create-a-multipage-app)! 🥳
