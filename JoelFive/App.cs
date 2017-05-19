using System;
using Bridge;
using Bridge.Html5;
using System.Threading.Tasks;

namespace JoelFive
{
    public class App
    {
        public const double smallNumber = 0.0001;
        public static async void Main()
        {
            Game game = await Game.Parse(
                Script.ToPlainObject(new
                {
                    width = 500,
                    height = 500,
                    interval = 25,
                    drawInterval = 25,
                    children = new[]
                    {
                        Script.ToPlainObject(new
                        {
                            type = "real game object",
                            x = 50,
                            y = 50,
                            width = 50,
                            height = 50,
                            image = "#ffc0c0",
                            gravity = 1
                        }),
                        Script.ToPlainObject(new
                        {
                            type = "real game object",
                            x = 50,
                            y = 200,
                            width = 50,
                            height = 50,
                            image = "#c0ffc0",
                            gravity = 0
                        })
                    }
                }));
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