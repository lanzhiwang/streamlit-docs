---
title: Main concepts
slug: /library/get-started/main-concepts
---

# Main concepts

Working with Streamlit is simple. First you sprinkle a few Streamlit commands
into a normal Python script, then you run it with `streamlit run`:
使用 Streamlit 非常简单。 首先，将一些 Streamlit 命令添加到普通的 Python 脚本中，然后使用 Streamlit run 运行它：

```bash
streamlit run your_script.py [-- script args]
```

As soon as you run the script as shown above, a local Streamlit server will
spin up and your app will open in a new tab in your default web browser. The app
is your canvas, where you'll draw charts, text, widgets, tables, and more.
一旦您运行如上所示的脚本，本地 Streamlit 服务器就会启动，您的应用程序将在默认 Web 浏览器的新选项卡中打开。
该应用程序是您的画布，您可以在其中绘制图表、文本、小部件、表格等。

What gets drawn in the app is up to you. For example
[`st.text`](/library/api-reference/text/st.text) writes raw text to your app, and
[`st.line_chart`](/library/api-reference/charts/st.line_chart) draws — you guessed it — a
line chart. Refer to our [API documentation](/library/api-reference) to see all commands that
are available to you.
应用程序中绘制的内容取决于您。 例如，st.text 将原始文本写入您的应用程序，而 st.line_chart 绘制（您猜对了）折线图。
请参阅我们的 API 文档以查看您可用的所有命令。

<Note>

When passing your script some custom arguments, they must be passed after two dashes. Otherwise the
arguments get interpreted as arguments to Streamlit itself.
当向脚本传递一些自定义参数时，必须在两个破折号之后传递它们。 否则，参数将被解释为 Streamlit 本身的参数。

</Note>

Another way of running Streamlit is to run it as a Python module. This can be
useful when configuring an IDE like PyCharm to work with Streamlit:
运行 Streamlit 的另一种方法是将其作为 Python 模块运行。 当配置像 PyCharm 这样的 IDE 来使用 Streamlit 时，这会很有用：

```bash
# Running
python -m streamlit run your_script.py

# is equivalent to:
streamlit run your_script.py
```

<Tip>

You can also pass a URL to `streamlit run`! This is great when combined with
GitHub Gists. For example:

```bash
streamlit run https://raw.githubusercontent.com/streamlit/demo-uber-nyc-pickups/master/streamlit_app.py
```

</Tip>

## Development flow

Every time you want to update your app, save the source file. When you do
that, Streamlit detects if there is a change and asks you whether you want to
rerun your app. Choose "Always rerun" at the top-right of your screen to
automatically update your app every time you change its source code.
每次您想要更新应用程序时，请保存源文件。 当您执行此操作时，Streamlit 会检测是否有更改并询问您是否要重新运行应用程序。
选择屏幕右上角的“始终重新运行”，以便在每次更改源代码时自动更新您的应用程序。

This allows you to work in a fast interactive loop: you type some code, save
it, try it out live, then type some more code, save it, try it out, and so on
until you're happy with the results. This tight loop between coding and viewing
results live is one of the ways Streamlit makes your life easier.
这允许您在快速交互循环中工作：您输入一些代码，保存它，实时尝试，然后输入更多代码，保存它，尝试它，依此类推，直到您对结果感到满意。
编码和实时查看结果之间的紧密循环是 Streamlit 让您的生活更轻松的方式之一。

<Tip>

While developing a Streamlit app, it's recommended to lay out your editor and
browser windows side by side, so the code and the app can be seen at the same
time. Give it a try!
开发 Streamlit 应用程序时，建议并排布局编辑器和浏览器窗口，以便可以同时看到代码和应用程序。 试一试！

</Tip>

As of Streamlit version 1.10.0 and higher, Streamlit apps cannot be run from the root directory of Linux distributions. If you try to run a Streamlit app from the root directory, Streamlit will throw a `FileNotFoundError: [Errno 2] No such file or directory` error. For more information, see GitHub issue [#5239](https://github.com/streamlit/streamlit/issues/5239).
从 Streamlit 版本 1.10.0 及更高版本开始，Streamlit 应用程序无法从 Linux 发行版的根目录运行。 如果您尝试从根目录运行 Streamlit 应用程序，Streamlit 将抛出 FileNotFoundError: [Errno 2] No such file or directory 错误。 有关更多信息，请参阅 GitHub 问题 #5239。

If you are using Streamlit version 1.10.0 or higher, your main script should live in a directory other than the root directory. When using Docker, you can use the `WORKDIR` command to specify the directory where your main script lives. For an example of how to do this, read [Create a Dockerfile](/knowledge-base/tutorials/deploy/docker#create-a-dockerfile).
如果您使用的是 Streamlit 版本 1.10.0 或更高版本，您的主脚本应位于根目录以外的目录中。 使用 Docker 时，可以使用 WORKDIR 命令指定主脚本所在的目录。
有关如何执行此操作的示例，请阅读创建 Dockerfile。

## Data flow

Streamlit's architecture allows you to write apps the same way you write plain
Python scripts. To unlock this, Streamlit apps have a unique data flow: any
time something must be updated on the screen, Streamlit reruns your entire
Python script from top to bottom.
Streamlit 的架构允许您像编写普通 Python 脚本一样编写应用程序。
为了解决这个问题，Streamlit 应用程序具有独特的数据流：每当屏幕上需要更新某些内容时，
Streamlit 都会从上到下重新运行整个 Python 脚本。

This can happen in two situations:
这可能在两种情况下发生：

- Whenever you modify your app's source code.
  每当您修改应用程序的源代码时。

- Whenever a user interacts with widgets in the app. For example, when dragging
  a slider, entering text in an input box, or clicking a button.
  每当用户与应用程序中的小部件交互时。 例如，拖动滑块、在输入框中输入文本或单击按钮时。

Whenever a callback is passed to a widget via the `on_change` (or `on_click`) parameter, the callback will always run before the rest of your script. For details on the Callbacks API, please refer to our [Session State API Reference Guide](/library/api-reference/session-state#use-callbacks-to-update-session-state).
每当通过 on_change （或 on_click）参数将回调传递给小部件时，回调将始终在脚本的其余部分之前运行。 有关回调 API 的详细信息，请参阅我们的会话状态 API 参考指南。

And to make all of this fast and seamless, Streamlit does some heavy lifting
for you behind the scenes. A big player in this story is the
[`@st.cache_data`](#caching) decorator, which allows developers to skip certain
costly computations when their apps rerun. We'll cover caching later in this
page.
为了使这一切变得快速、无缝，Streamlit 在幕后为您做了一些繁重的工作。
这个故事中的一个重要角色是 @st.cache_data 装饰器，它允许开发人员在应用程序重新运行时跳过某些昂贵的计算。 我们将在本页后面介绍缓存。

## Display and style data

There are a few ways to display data (tables, arrays, data frames) in Streamlit
apps. [Below](/library/get-started/main-concepts#use-magic), you will be introduced to _magic_
and [`st.write()`](/library/api-reference/write-magic/st.write), which can be used to write
anything from text to tables. After that, let's take a look at methods designed
specifically for visualizing data.
在 Streamlit 应用程序中显示数据（表、数组、数据框）的方法有多种。
下面，将向您介绍 magic 和 st.write()，它们可用于写入从文本到表格的任何内容。 之后，让我们看一下专门为可视化数据而设计的方法。



### Use magic
使用魔法

You can also write to your app without calling any Streamlit methods.
Streamlit supports "[magic commands](/library/api-reference/write-magic/magic)," which means you don't have to use
[`st.write()`](/library/api-reference/write-magic/st.write) at all! To see this in action try this snippet:
您还可以在不调用任何 Streamlit 方法的情况下写入应用程序。 Streamlit 支持“魔法命令”，这意味着您根本不必使用 st.write()！ 要查看实际效果，请尝试以下代码片段：

```python
"""
# My first app
Here's our first attempt at using data to create a table:
"""

import streamlit as st
import pandas as pd
df = pd.DataFrame({
  'first column': [1, 2, 3, 4],
  'second column': [10, 20, 30, 40]
})

df
```

Any time that Streamlit sees a variable or a literal
value on its own line, it automatically writes that to your app using
[`st.write()`](/library/api-reference/write-magic/st.write). For more information, refer to the
documentation on [magic commands](/library/api-reference/write-magic/magic).
每当 Streamlit 在自己的行上看到变量或文字值时，它都会使用 st.write() 自动将其写入您的应用程序。
有关更多信息，请参阅有关 magic 命令的文档。

### Write a data frame

Along with [magic commands](/library/api-reference/write-magic/magic),
[`st.write()`](/library/api-reference/write-magic/st.write) is Streamlit's "Swiss Army knife". You
can pass almost anything to [`st.write()`](/library/api-reference/write-magic/st.write):
text, data, Matplotlib figures, Altair charts, and more. Don't worry, Streamlit
will figure it out and render things the right way.
与魔法命令一样，st.write() 是 Streamlit 的“瑞士军刀”。
您几乎可以将任何内容传递给 st.write()：文本、数据、Matplotlib 图形、Altair 图表等。
不用担心，Streamlit 会解决这个问题并以正确的方式呈现。

```python
import streamlit as st
import pandas as pd

st.write("Here's our first attempt at using data to create a table:")
st.write(pd.DataFrame({
    'first column': [1, 2, 3, 4],
    'second column': [10, 20, 30, 40]
}))
```

There are other data specific functions like
[`st.dataframe()`](/library/api-reference/data/st.dataframe) and
[`st.table()`](/library/api-reference/data/st.table) that you can also use for displaying
data. Let's understand when to use these features and how to add colors and styling to your data frames.
还有其他特定于数据的函数，例如 st.dataframe() 和 st.table()，您也可以使用它们来显示数据。 让我们了解何时使用这些功能以及如何向数据框添加颜色和样式。

You might be asking yourself, "why wouldn't I always use `st.write()`?" There are
a few reasons:
您可能会问自己，“为什么我不总是使用 st.write()？” 有以下几个原因：

1. _Magic_ and [`st.write()`](/library/api-reference/write-magic/st.write) inspect the type of
   data that you've passed in, and then decide how to best render it in the
   app. Sometimes you want to draw it another way. For example, instead of
   drawing a dataframe as an interactive table, you may want to draw it as a
   static table by using `st.table(df)`.
   Magic 和 st.write() 检查您传入的数据类型，然后决定如何在应用程序中最好地呈现它。
   有时你想以另一种方式绘制它。 例如，您可能希望使用 st.table(df) 将数据框绘制为静态表，而不是将其绘制为交互式表格。

2. The second reason is that other methods return an object that can be used
   and modified, either by adding data to it or replacing it.
   第二个原因是其他方法返回一个可以使用和修改的对象，可以通过向其添加数据或替换它。

3. Finally, if you use a more specific Streamlit method you can pass additional
   arguments to customize its behavior.
   最后，如果您使用更具体的 Streamlit 方法，您可以传递其他参数来自定义其行为。

For example, let's create a data frame and change its formatting with a Pandas
`Styler` object. In this example, you'll use Numpy to generate a random sample,
and the [`st.dataframe()`](/library/api-reference/data/st.dataframe) method to draw an
interactive table.
例如，让我们创建一个数据框并使用 Pandas Styler 对象更改其格式。
在此示例中，您将使用 Numpy 生成随机样本，并使用 st.dataframe() 方法绘制交互式表格。

<Note>

This example uses Numpy to generate a random sample, but you can use Pandas
DataFrames, Numpy arrays, or plain Python arrays.
此示例使用 Numpy 生成随机样本，但您可以使用 Pandas DataFrame、Numpy 数组或普通 Python 数组。

</Note>

```python
import streamlit as st
import numpy as np

dataframe = np.random.randn(10, 20)
st.dataframe(dataframe)
```

Let's expand on the first example using the Pandas `Styler` object to highlight
some elements in the interactive table.

```python
import streamlit as st
import numpy as np
import pandas as pd

dataframe = pd.DataFrame(
    np.random.randn(10, 20),
    columns=('col %d' % i for i in range(20)))

st.dataframe(dataframe.style.highlight_max(axis=0))
```

Streamlit also has a method for static table generation:
[`st.table()`](/library/api-reference/data/st.table).

```python
import streamlit as st
import numpy as np
import pandas as pd

dataframe = pd.DataFrame(
    np.random.randn(10, 20),
    columns=('col %d' % i for i in range(20)))
st.table(dataframe)
```

### Draw charts and maps

Streamlit supports several popular data charting libraries like [Matplotlib,
Altair, deck.gl, and more](/library/api-reference#chart-elements). In this section, you'll
add a bar chart, line chart, and a map to your app.
Streamlit 支持多种流行的数据图表库，例如 Matplotlib、Altair、deck.gl 等。 在本部分中，您将向您的应用添加条形图、折线图和地图。

### Draw a line chart

You can easily add a line chart to your app with
[`st.line_chart()`](/library/api-reference/charts/st.line_chart). We'll generate a random
sample using Numpy and then chart it.
您可以使用 st.line_chart() 轻松地将折线图添加到您的应用程序中。 我们将使用 Numpy 生成随机样本，然后将其绘制成图表。

```python
import streamlit as st
import numpy as np
import pandas as pd

chart_data = pd.DataFrame(
     np.random.randn(20, 3),
     columns=['a', 'b', 'c'])

st.line_chart(chart_data)
```

### Plot a map

With [`st.map()`](/library/api-reference/charts/st.map) you can display data points on a map.
Let's use Numpy to generate some sample data and plot it on a map of
San Francisco.

```python
import streamlit as st
import numpy as np
import pandas as pd

map_data = pd.DataFrame(
    np.random.randn(1000, 2) / [50, 50] + [37.76, -122.4],
    columns=['lat', 'lon'])

st.map(map_data)
```

## Widgets
小部件

When you've got the data or model into the state that you want to explore, you
can add in widgets like [`st.slider()`](/library/api-reference/widgets/st.slider),
[`st.button()`](/library/api-reference/widgets/st.button) or
[`st.selectbox()`](/library/api-reference/widgets/st.selectbox). It's really straightforward
— treat widgets as variables:
当您将数据或模型置于您想要探索的状态时，您可以添加 st.slider()、st.button() 或 st.selectbox() 等小部件。 这非常简单 - 将小部件视为变量：

```python
import streamlit as st
x = st.slider('x')  # 👈 this is a widget
st.write(x, 'squared is', x * x)
```

On first run, the app above should output the text "0 squared is 0". Then
every time a user interacts with a widget, Streamlit simply reruns your script
from top to bottom, assigning the current state of the widget to your variable
in the process.
第一次运行时，上面的应用程序应输出文本“0 squared is 0”。
然后，每次用户与小部件交互时，Streamlit 都会从上到下重新运行您的脚本，并将小部件的当前状态分配给进程中的变量。

For example, if the user moves the slider to position `10`, Streamlit will
rerun the code above and set `x` to `10` accordingly. So now you should see the
text "10 squared is 100".
例如，如果用户将滑块移动到位置 10，Streamlit 将重新运行上面的代码，并将 x 相应地设置为 10。 现在您应该看到文本“10 square is 100”。

Widgets can also be accessed by key, if you choose to specify a string to use as the unique key for the widget:
如果您选择指定一个字符串用作小部件的唯一键，则还可以通过键访问小部件：

```python
import streamlit as st
st.text_input("Your name", key="name")

# You can access the value at any point with:
st.session_state.name
```

Every widget with a key is automatically added to Session State. For more information about Session State, its association with widget state, and its limitations, see [Session State API Reference Guide](/library/api-reference/session-state).
每个带有键的小部件都会自动添加到会话状态。 有关会话状态、其与小部件状态的关联及其限制的更多信息，请参阅会话状态 API 参考指南。

### Use checkboxes to show/hide data
使用复选框显示/隐藏数据

One use case for checkboxes is to hide or show a specific chart or section in
an app. [`st.checkbox()`](/library/api-reference/widgets/st.checkbox) takes a single argument,
which is the widget label. In this sample, the checkbox is used to toggle a
conditional statement.
复选框的一种用例是隐藏或显示应用程序中的特定图表或部分。 st.checkbox() 采用单个参数，即小部件标签。 在此示例中，复选框用于切换条件语句。


```python
import streamlit as st
import numpy as np
import pandas as pd

if st.checkbox('Show dataframe'):
    chart_data = pd.DataFrame(
       np.random.randn(20, 3),
       columns=['a', 'b', 'c'])

    chart_data
```

### Use a selectbox for options

Use [`st.selectbox`](/library/api-reference/widgets/st.selectbox) to choose from a series. You
can write in the options you want, or pass through an array or data frame
column.

Let's use the `df` data frame we created earlier.

```python
import streamlit as st
import pandas as pd

df = pd.DataFrame({
    'first column': [1, 2, 3, 4],
    'second column': [10, 20, 30, 40]
    })

option = st.selectbox(
    'Which number do you like best?',
     df['first column'])

'You selected: ', option
```

## Layout

Streamlit makes it easy to organize your widgets in a left panel sidebar with
[`st.sidebar`](/library/api-reference/layout/st.sidebar). Each element that's passed to
[`st.sidebar`](/library/api-reference/layout/st.sidebar) is pinned to the left, allowing
users to focus on the content in your app while still having access to UI
controls.

For example, if you want to add a selectbox and a slider to a sidebar,
use `st.sidebar.slider` and `st.sidebar.selectbox` instead of `st.slider` and
`st.selectbox`:

```python
import streamlit as st

# Add a selectbox to the sidebar:
add_selectbox = st.sidebar.selectbox(
    'How would you like to be contacted?',
    ('Email', 'Home phone', 'Mobile phone')
)

# Add a slider to the sidebar:
add_slider = st.sidebar.slider(
    'Select a range of values',
    0.0, 100.0, (25.0, 75.0)
)
```

Beyond the sidebar, Streamlit offers several other ways to control the layout
of your app. [`st.columns`](/library/api-reference/layout/st.columns) lets you place widgets side-by-side, and
[`st.expander`](/library/api-reference/layout/st.expander) lets you conserve space by hiding away large content.

```python
import streamlit as st

left_column, right_column = st.columns(2)
# You can use a column just like st.sidebar:
left_column.button('Press me!')

# Or even better, call Streamlit functions inside a "with" block:
with right_column:
    chosen = st.radio(
        'Sorting hat',
        ("Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"))
    st.write(f"You are in {chosen} house!")
```

<Note>

`st.echo` and `st.spinner` are not currently supported inside the sidebar
or layout options. Rest assured, though, we're currently working on adding support for those too!

</Note>

### Show progress

When adding long running computations to an app, you can use
[`st.progress()`](/library/api-reference/status/st.progress) to display status in real time.

First, let's import time. We're going to use the `time.sleep()` method to
simulate a long running computation:

```python
import time
```

Now, let's create a progress bar:

```python
import streamlit as st
import time

'Starting a long computation...'

# Add a placeholder
latest_iteration = st.empty()
bar = st.progress(0)

for i in range(100):
  # Update the progress bar with each iteration.
  latest_iteration.text(f'Iteration {i+1}')
  bar.progress(i + 1)
  time.sleep(0.1)

'...and now we\'re done!'
```

## Themes

Streamlit supports Light and Dark themes out of the box. Streamlit will first
check if the user viewing an app has a Light or Dark mode preference set by
their operating system and browser. If so, then that preference will be used.
Otherwise, the Light theme is applied by default.
Streamlit 支持开箱即用的浅色和深色主题。 Streamlit 将首先检查查看应用程序的用户是否具有由其操作系统和浏览器设置的浅色或深色模式首选项。 如果是这样，那么将使用该偏好。 否则，默认应用浅色主题。

You can also change the active theme from "⋮" → "Settings".
您还可以从“⋮”→“设置”更改活动主题。

![Changing Themes](/images/change_theme.gif)

Want to add your own theme to an app? The "Settings" menu has a theme editor
accessible by clicking on "Edit active theme". You can use this editor to try
out different colors and see your app update live.
想要将您自己的主题添加到应用程序中吗？ “设置”菜单有一个主题编辑器，可通过单击“编辑活动主题”进行访问。 您可以使用此编辑器尝试不同的颜色并实时查看您的应用程序更新。

![Editing Themes](/images/edit_theme.gif)

When you're happy with your work, themes can be saved by
[setting config options](/library/advanced-features/configuration#set-configuration-options)
in the `[theme]` config section. After you've defined a theme for your app, it
will appear as "Custom Theme" in the theme selector and will be applied by
default instead of the included Light and Dark themes.
当您对工作感到满意时，可以通过在 [主题] 配置部分中设置配置选项来保存主题。 为应用程序定义主题后，它将在主题选择器中显示为“自定义主题”，并且默认应用，而不是包含的浅色和深色主题。

More information about the options available when defining a theme can be found
in the [theme option documentation](/library/advanced-features/theming).
有关定义主题时可用选项的更多信息，请参阅主题选项文档。

<Note>

The theme editor menu is available only in local development. If you've deployed your app using
Streamlit Community Cloud, the "Edit active theme" button will no longer be displayed in the "Settings"
menu.
主题编辑器菜单仅在本地开发中可用。 如果您已使用 Streamlit Community Cloud 部署应用程序，则“设置”菜单中将不再显示“编辑活动主题”按钮。

</Note>

<Tip>

Another way to experiment with different theme colors is to turn on the "Run on save" option, edit
your config.toml file, and watch as your app reruns with the new theme colors applied.
尝试不同主题颜色的另一种方法是打开“保存时运行”选项，编辑 config.toml 文件，然后观察应用程序在应用新主题颜色的情况下重新运行。

</Tip>

## Caching

The Streamlit cache allows your app to stay performant even when loading data from the web, manipulating large datasets, or performing expensive computations.
Streamlit 缓存使您的应用程序即使在从 Web 加载数据、操作大型数据集或执行昂贵的计算时也能保持高性能。

The basic idea behind caching is to store the results of expensive function calls and return the cached result when the same inputs occur again rather than calling the function on subsequent runs.
缓存背后的基本思想是存储昂贵的函数调用的结果，并在相同的输入再次出现时返回缓存的结果，而不是在后续运行中调用该函数。

To cache a function in Streamlit, you need to decorate it with one of two decorators (`st.cache_data` and `st.cache_resource`):
要在 Streamlit 中缓存函数，您需要使用两个装饰器之一（st.cache_data 和 st.cache_resource）来装饰它：

```python
@st.cache_data
def long_running_function(param1, param2):
    return …
```

In this example, decorating `long_running_function` with `@st.cache_data` tells Streamlit that whenever the function is called, it checks two things:
在此示例中，用 @st.cache_data 装饰 long_running_function 告诉 Streamlit，每当调用该函数时，它都会检查两件事：

1. The values of the input parameters (in this case, `param1` and `param2`).
   输入参数的值（在本例中为 param1 和 param2）。

2. The code inside the function.
   函数内部的代码。

If this is the first time Streamlit sees these parameter values and function code, it runs the function and stores the return value in a cache. The next time the function is called with the same parameters and code (e.g., when a user interacts with the app), Streamlit will skip executing the function altogether and return the cached value instead. During development, the cache updates automatically as the function code changes, ensuring that the latest changes are reflected in the cache.
如果这是 Streamlit 第一次看到这些参数值和函数代码，它会运行该函数并将返回值存储在缓存中。 下次使用相同的参数和代码调用该函数时（例如，当用户与应用程序交互时），Streamlit 将完全跳过执行该函数并返回缓存的值。 开发过程中，缓存会随着功能代码的变化而自动更新，确保最新的变化反映在缓存中。

As mentioned, there are two caching decorators:
如前所述，有两个缓存装饰器：

- `st.cache_data` is the recommended way to cache computations that return data: loading a DataFrame from CSV, transforming a NumPy array, querying an API, or any other function that returns a serializable data object (str, int, float, DataFrame, array, list, …). It creates a new copy of the data at each function call, making it safe against [mutations and race conditions](/library/advanced-features/caching#mutation-and-concurrency-issues). The behavior of `st.cache_data` is what you want in most cases – so if you're unsure, start with `st.cache_data` and see if it works!
  st.cache_data 是缓存返回数据的计算的推荐方法：从 CSV 加载 DataFrame、转换 NumPy 数组、查询 API 或返回可序列化数据对象（str、int、float、DataFrame、array、 列表， …）。 它在每次函数调用时创建一个新的数据副本，使其能够安全地抵御突变和竞争条件。 st.cache_data 的行为在大多数情况下都是您想要的 - 因此，如果您不确定，请从 st.cache_data 开始，看看它是否有效！

- `st.cache_resource` is the recommended way to cache global resources like ML models or database connections – unserializable objects that you don’t want to load multiple times. Using it, you can share these resources across all reruns and sessions of an app without copying or duplication. Note that any mutations to the cached return value directly mutate the object in the cache (more details below).
  st.cache_resource 是缓存全局资源（例如 ML 模型或数据库连接）的推荐方法 - 您不想多次加载的不可序列化对象。 使用它，您可以在应用程序的所有重新运行和会话之间共享这些资源，而无需复制或重复。 请注意，对缓存返回值的任何突变都会直接改变缓存中的对象（更多详细信息如下）。

<Image src="/images/caching-high-level-diagram.png" caption="Streamlit's two caching decorators and their use cases." alt="Streamlit's two caching decorators and their use cases. Use st.cache_data for anything you'd store in a database. Use st.cache_resource for anything you can't store in a database, like a connection to a database or a machine learning model." />

For more information about the Streamlit caching decorators, their configuration parameters, and their limitations, see [Caching](/library/advanced-features/caching).

## Pages

As apps grow large, it becomes useful to organize them into multiple pages. This makes the app easier to manage as a developer and easier to navigate as a user. Streamlit provides a frictionless way to create multipage apps.
随着应用程序变得越来越大，将它们组织成多个页面变得很有用。 这使得应用程序更易于开发人员管理，也更易于用户导航。 Streamlit 提供了一种创建多页面应用程序的无摩擦方式。

We designed this feature so that building a multipage app is as easy as building a single-page app! Just add more pages to an existing app as follows:
我们设计此功能是为了让构建多页应用程序与构建单页应用程序一样简单！ 只需向现有应用程序添加更多页面，如下所示：

1. In the folder containing your main script, create a new `pages` folder. Let’s say your main script is named `main_page.py`.
   在包含主脚本的文件夹中，创建一个新的页面文件夹。 假设您的主脚本名为 main_page.py。

2. Add new `.py` files in the `pages` folder to add more pages to your app.
   在页面文件夹中添加新的 .py 文件以向您的应用程序添加更多页面。

3. Run `streamlit run main_page.py` as usual.
   像往常一样运行streamlit run main_page.py。

That’s it! The `main_page.py` script will now correspond to the main page of your app. And you’ll see the other scripts from the `pages` folder in the sidebar page selector. For example:
就是这样！ main_page.py 脚本现在将对应于您的应用程序的主页。 您将在侧边栏页面选择器的页面文件夹中看到其他脚本。 例如：

<summary><code>main_page.py</code></summary>

```python
import streamlit as st

st.markdown("# Main page 🎈")
st.sidebar.markdown("# Main page 🎈")
```

<summary><code>pages/page_2.py</code></summary>

```python
import streamlit as st

st.markdown("# Page 2 ❄️")
st.sidebar.markdown("# Page 2 ❄️")
```

<summary><code>pages/page_3.py</code></summary>

```python
import streamlit as st

st.markdown("# Page 3 🎉")
st.sidebar.markdown("# Page 3 🎉")
```


<br />

Now run `streamlit run main_page.py` and view your shiny new multipage app!

<Image src="/images/mpa-main-concepts.gif" />

Our documentation on [Multipage apps](/library/get-started/multipage-apps) teaches you how to add pages to your app, including how to define pages, structure and run multipage apps, and navigate between pages. Once you understand the basics, [create your first multipage app](/library/get-started/multipage-apps/create-a-multipage-app)!
我们有关多页面应用程序的文档将教您如何向应用程序添加页面，包括如何定义页面、构建和运行多页面应用程序以及如何在页面之间导航。
了解基础知识后，即可创建您的第一个多页应用程序！

## App model

Now that you know a little more about all the individual pieces, let's close
the loop and review how it works together:
现在您对所有各个部分有了更多的了解，让我们关闭循环并回顾一下它是如何协同工作的：

1. Streamlit apps are Python scripts that run from top to bottom
   Streamlit 应用程序是从上到下运行的 Python 脚本

2. Every time a user opens a browser tab pointing to your app, the script is
   re-executed
   每次用户打开指向您的应用程序的浏览器选项卡时，都会重新执行该脚本

3. As the script executes, Streamlit draws its output live in a browser
   当脚本执行时，Streamlit 在浏览器中实时绘制其输出

4. Scripts use the Streamlit cache to avoid recomputing expensive functions, so
   updates happen very fast
   脚本使用 Streamlit 缓存来避免重新计算昂贵的函数，因此更新速度非常快

5. Every time a user interacts with a widget, your script is re-executed and
   the output value of that widget is set to the new value during that run.
   每次用户与小部件交互时，您的脚本都会重新执行，并且该小部件的输出值将在运行期间设置为新值。

6. Streamlit apps can contain multiple pages, which are defined in separate
   `.py` files in a `pages` folder.
   Streamlit 应用程序可以包含多个页面，这些页面在页面文件夹中的单独 .py 文件中定义。

![The Streamlit app model](/images/app_model.png)

