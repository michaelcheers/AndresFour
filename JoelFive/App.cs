using System;
using Bridge;
using Bridge.Html5;
using System.Threading.Tasks;

namespace JoelFive
{
    public class App
    {
        public const double smallNumber = 0.0001;
        public static async void Main ()
        {
            var input = new HTMLInputElement();
            Document.Body.AppendChild(input);
            TaskCompletionSource<string> task = new TaskCompletionSource<string>();
            input.OnInput = e => task.SetResult(input.Value);
            string parseString = Global.Atob(await task.Task);
            input.Style.Display = Display.None;
            Game game = await Game.Create(JSON.Parse(parseString));
            Document.Body.AppendChild(game.Canvas);
            game.Start();
        }

        public static Task<HTMLImageElement> LoadImage (string value)
        {
            HTMLImageElement image = new HTMLImageElement
            {
                Src = value
            };
            TaskCompletionSource<HTMLImageElement> task = new TaskCompletionSource<HTMLImageElement>();
            image.OnLoad = e => task.SetResult(image);
            return task.Task;
        }
    }
}