using System;
using Bridge;
using Bridge.Html5;
using System.Threading.Tasks;

namespace AndresFour
{
    public class MainStarter
    {

        static Task<string> FileRead(HTMLInputElement fileInput)
        {
            var file = fileInput.Files[0];
            dynamic fileReader = Script.Write<dynamic>("new FileReader()");
            TaskCompletionSource<string> task = new TaskCompletionSource<string>();
            fileReader.onload = (Action<Event>)(e => task.SetResult(fileReader.result));
            fileReader.readAsText(file);
            return task.Task;
        }
        public static void Main ()
        {
            Document.Body.AppendChild(new HTMLAnchorElement
            {
                InnerHTML = "Play Game",
                OnClick = e => MainStarter.Start()
            });
            Document.Body.AppendChild(new HTMLBRElement());
            Document.Body.AppendChild(new HTMLAnchorElement
            {
                InnerHTML = "Level Editor",
                OnClick = e => LevelEditor.Start()
            });
        }
        public static async void Start ()
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
            Game game = await Game.Create(JSON.Parse(parseString));
            game.Canvas.Style.Border = "1px solid black";
            Document.Body.AppendChild(game.Canvas);
            game.Start();
        }
    }
}