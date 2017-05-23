using Bridge;
using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

namespace AndresFour
{
    public class Game
    {
        public List<GameObject> Children;
        public int Interval;
        public int DrawInterval;
        public HTMLCanvasElement Canvas;
        public HashSet<int> Down;
        public static async Task<Game> Create(dynamic @dynamic)
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
                },
                Down = new HashSet<int>()
            };
            foreach (var item in (dynamic[])@dynamic.children)
                children.Add(await GameObject.Create(item));
            return game;
        }
        public void Start ()
        {
            Document.Body.OnKeyUp = e => Down.Remove(e.KeyCode);
            Document.Body.OnKeyDown = e => Down.Add(e.KeyCode);
            Global.SetInterval(Update, Interval);
            Global.SetInterval(Draw, DrawInterval);
        }
        public override dynamic ToDynamic() =>
            Script.ToPlainObject(new
            {
                width = Canvas.Width,
                height = Canvas.Height,
                interval = Interval,
                drawInterval = DrawInterval,
                children = Children.ConvertAll(v => v.ToDynamic()).ToArray()
            });
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
                    if (drawObject.Selected)
                    {
                        context.StrokeStyle = "#4286f4";
                        context.StrokeRect((int)drawObject.X - 1, (int)drawObject.Y - 1, (int)drawObject.Width + 2, (int)drawObject.Height + 2);
                    }
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
