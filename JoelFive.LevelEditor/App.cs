using System;
using Bridge;
using Bridge.Html5;
using System.Threading.Tasks;

namespace JoelFive.LevelEditor
{
    public class App
    {
        static Game game;
        static HTMLDivElement left;
        static HTMLDivElement right;
        static HTMLTableElement table;

        static void Save ()
        {
            HTMLAnchorElement download = new HTMLAnchorElement
            {
                Download = "level.dat",
                Href = $"data:text/plain;charset=UTF-8,{Global.Btoa(JSON.Stringify(game.ToDynamic()))}"
            };
            download.Click();
        }

        static Task<string> FileRead (HTMLInputElement fileInput)
        {
            var file = fileInput.Files[0];
            dynamic fileReader = Script.Write<dynamic>("new FileReader()");
            TaskCompletionSource<string> task = new TaskCompletionSource<string>();
            fileReader.onload = (Action<Event>)(e => task.SetResult(fileReader.result));
            fileReader.readAsText(file);
            return task.Task;
        }

        public static async void Main()
        {
            HTMLDivElement start = new HTMLDivElement();
            HTMLInputElement input = new HTMLInputElement();
            HTMLInputElement file = new HTMLInputElement
            {
                Type = InputType.File
            };
            start.AppendChild(input);
            start.AppendChild(new Text(" or"));
            start.AppendChild(new HTMLBRElement());
            start.AppendChild(file);
            Document.Body.AppendChild(start);
            TaskCompletionSource<string> task = new TaskCompletionSource<string>();
            input.OnInput = e => task.SetResult(input.Value);
            file.OnChange = async e => task.SetResult(await FileRead(file));
            string parseString = Global.Atob(await task.Task);
            start.Style.Display = Display.None;
            game = await Game.Create(JSON.Parse(parseString));
            game.Canvas.Style.Border = "1px solid black";
            Document.Body.AppendChild(left = new HTMLDivElement());
            Document.Body.AppendChild(right = new HTMLDivElement());
            right.AppendChild(table = new HTMLTableElement());
            left.Style.Width = "50%";
            right.Style.Width = "50%";
            left.Style.CssFloat = Float.Left;
            right.Style.CssFloat = Float.Right;
            left.AppendChild(game.Canvas);
            HTMLButtonElement button = new HTMLButtonElement
            {
                InnerHTML = "Save",
                OnClick = e => Save()
            };
            button.Style.Position = Position.Fixed;
            button.Style.Bottom = "0";
            button.Style.Left = "0";
            Document.Body.AppendChild(button);
            Reload();
        }

        public static void Reload ()
        {
            table.InnerHTML = "";
            foreach (var gameObject in game.Children)
            {
                if (string.IsNullOrEmpty(gameObject.Name))
                    continue;
                HTMLTableRowElement row = new HTMLTableRowElement();
                var cell = new HTMLTableDataCellElement();
                cell.AppendChild(new HTMLAnchorElement
                {
                    InnerHTML = gameObject.Name,
                    Href = "javascript:void(0)",
                    OnClick = v => Select(gameObject)
                });
                cell.AppendChild(new HTMLBRElement());
                string text;
                if (gameObject is Character)
                    text = "Character";
                else if (gameObject is RealGameObject)
                    text = "Real Thing";
                else if (gameObject is DrawnGameObject)
                    text = "Illusion";
                else
                    throw new Exception($"Type not allowed: {gameObject.GetType().FullName}");
                cell.AppendChild(new Text(text));
                row.AppendChild(cell);
                table.AppendChild(row);
            }
            game.Draw();
        }

        static GameObject selected;

        public static void Select(GameObject gameObject)
        {
            if (selected is DrawnGameObject)
                selected.As<DrawnGameObject>().Selected = false;
            if ((selected = gameObject) is DrawnGameObject)
                gameObject.As<DrawnGameObject>().Selected = true;
            Reload();
        }
    }
}