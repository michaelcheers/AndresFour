using System;
using Bridge;
using Bridge.Html5;
using System.Threading.Tasks;

namespace JoelFive
{
    public class App
    {
        public static async void Main ()
        {
            var input = new HTMLInputElement();
            Document.Body.AppendChild(input);
            TaskCompletionSource<string> task = new TaskCompletionSource<string>();
            input.OnInput = e => task.SetResult(input.Value);
            string parseString = Global.Atob(await task.Task);
            input.Style.Display = Display.None;
            Game game = await Game.Create(JSON.Parse(parseString));
            game.Canvas.Style.Border = "1px solid black";
            Document.Body.AppendChild(game.Canvas);
            game.Start();
        }
    }
}