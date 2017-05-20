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

        public static async void Main()
        {
            HTMLInputElement input = new HTMLInputElement();
            Document.Body.AppendChild(input);
            TaskCompletionSource<string> task = new TaskCompletionSource<string>();
            input.OnInput = e => task.SetResult(input.Value);
            string parseString = Global.Atob(await task.Task);
            input.Style.Display = Display.None;
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