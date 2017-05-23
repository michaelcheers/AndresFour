using System;
using Bridge;
using Bridge.Html5;
using System.Threading.Tasks;

namespace JoelFive
{
    public class App
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
        public static async void Main ()
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