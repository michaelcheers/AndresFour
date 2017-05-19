using Bridge;
using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoelFive
{
    public class Game : GameObject
    {
        public List<GameObject> Children;
        public int Interval;
        public int DrawInterval;
        public HTMLCanvasElement Canvas;
        public static new async Task<Game> Parse(dynamic @dynamic)
        {
            List<GameObject> children;
            Game game = new Game
            {
                Children = children = new List<GameObject>(),
                Interval = @dynamic.interval,
                DrawInterval = @dynamic.drawInterval,
                Canvas = new HTMLCanvasElement
                {
                    Width = @dynamic.width,
                    Height = @dynamic.height
                }
            };
            foreach (var item in (dynamic[])@dynamic.children)
                children.Add(await GameObject.Parse(item));
            return game;
        }
        public void Start ()
        {
            Global.SetInterval(Update, Interval);
            Global.SetInterval(Draw, DrawInterval);
        }
        public void Draw ()
        {
            var context = Canvas.GetContext(CanvasTypes.CanvasContext2DType.CanvasRenderingContext2D);
            context.ClearRect(0, 0, Canvas.Width, Canvas.Height);
            foreach (var child in Children)
            {
                if (child is DrawnGameObject)
                {
                    var drawObject = child.As<DrawnGameObject>();
#pragma warning disable CS0184 // 'is' expression's given expression is never of the provided type
                    if (drawObject.Image is string)
#pragma warning restore CS0184 // 'is' expression's given expression is never of the provided type
                    {
                        context.FillStyle = drawObject.Image.As<string>();
                        context.FillRect((int)drawObject.X, (int)drawObject.Y, (int)drawObject.Width, (int)drawObject.Height);
                    }
                    else
                        context.DrawImage(drawObject.Image.As<HTMLImageElement>(), drawObject.X, drawObject.Y);
                }
            }
        }
        public void Update ()
        {
            foreach (var child in Children)
                if (child is RealGameObject)
                    child.As<RealGameObject>().Update(this);
        }
    }
}
