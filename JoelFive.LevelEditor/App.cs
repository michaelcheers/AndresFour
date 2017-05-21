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
            var dynamicVal = game.ToDynamic();
            dynamicVal.recovery = creation;
            HTMLAnchorElement download = new HTMLAnchorElement
            {
                Download = "level.dat",
                Href = $"data:text/plain;charset=UTF-8,{Global.Btoa(JSON.Stringify(dynamicVal))}"
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

        public static dynamic creation;

        public static async void Main()
        {
            cross = await BridgeEssentials.LoadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4QUVEx4JDRbQCAAAAzNJREFUeNrt3cFt4zAQBdCfxRbhdBHAhcSXACnDZaSCPfsYIAWkigBpYS/BAt4euAdJgOLVSCNyKJGc/wHdbIrzH2I7sBIBDMMwDMMwjH3uNA8KKU92mJS+Zh8TUhdwmNTOfirPcwDwDOABwB8AbwA+hg0QpcsNxhHAE7ruPgG8ousufvH+OATgPQBhdPwOwOPoMe4Tvh+PfUfjzt77LuP6Gi1+vll4OL4CcCLKfxinvpupzs4WIBdhcaJgFUbou5zt6YfinHOve/cAfgE4jTfoJTeznvou7meeYvIecpx4PXT/k7LyJ2N43z1avGQNb1JLJ3SDEoHxZfIhiCiLnWyHIWzANcruGMJGXKIUgyFsyBVKcRjCxlygFIshbLBplOIxhI02iVINhrDhplCqwxA23gRKtRjCAFWjVI8hDFIlSjMYwkBVoTSHIQxWBUqzGMKARaM0jyEMWiSKGwxh4KJQ3GEIgxeB4hZDKGBXFPcYQhG7oBBjvpBNUYihK2YTFGKsKygrCjHiisqCQoyVyYlCjMjkQCFGYixRiGEUCxRiGMcQhRhWMUAhhnUSUIiRKxEof/uDGLkSgUKM3DFCIYZlElGIkSMTH2uvCoxrKOQyozXR/BVuiUn+tyFMZCJ+6cvyJReDZAyiWMYIgygWicC4Kt7oiRKTCIzho22Wbx5dJwGjiOu+mooBBlGsYohBlNRYYAhrEWVtLDGENYmiTQ4MYW2iLCUnhnAOoiiLyvq1K1HWFbTJd+BE0RWz6QUJRJkvZJerQ4gyXcSul+q4RykJQ9iTH5QSMYS9tY9SMoawx3ZRasAQ9toeSk0Ywp7bQakRQ9h7/Sg1Ywgz1IvSAoYwS30oLWEIM9WD0iKGMFv5KC1jCDOWi+IBQ5i1PBRPGMLM5aB4xBBm3x/FM4bQwX4oxBC72B6FGIudbIdCDHU326CMnqy9saQLjIl+tChmN5Z8IcZiR1qUFwuQCzFUPWlQLhYgZ2Kou1pCOVuA8Ab3ikygRN3g/m7pJH0OAJ4BPKC7BfUbgA/VIo5yU/QRwBO67j4BvKK/ffdcX1qQuAUcJrUzVZ8h5ckOw74YhmEYhmFKyz+CH5J6R0WlaQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNS0yMVQxOTozMDowOSswMDowME2eJS8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDUtMjFUMTk6MzA6MDkrMDA6MDA8w52TAAAAAElFTkSuQmCC");
            cross.Width = 10;
            cross.Height = 10;
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
            dynamic jsonObject = JSON.Parse(parseString);
            creation = jsonObject;
            start.Style.Display = Display.None;
            game = await Game.Create(jsonObject);
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

        public static void Remove (GameObject gameObject)
        {
            if (!game.Children.Remove(gameObject))
                throw new Exception();
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
                cell.Style.BorderBottom = "1px solid black";
                cell.AppendChild(new HTMLAnchorElement
                {
                    InnerHTML = gameObject.Name,
                    Href = "javascript:void(0)",
                    OnClick = v => Select(gameObject)
                });
                cell.AppendChild(new Text(" "));
                var cross = new HTMLAnchorElement
                {
                    OnClick = v => Remove(gameObject),
                    Href = "javascript:void(0)"
                };
                cross.AppendChild(App.cross = App.cross.CloneNode().As<HTMLImageElement>());
                cell.AppendChild(cross);
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
                cell.AppendChild(new Text($"Type: {text}"));

                row.AppendChild(cell);
                table.AppendChild(row);
            }
            game.Draw();
        }

        static GameObject selected;
        static HTMLImageElement cross;

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