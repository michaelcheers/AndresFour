﻿using System;
using Bridge;
using Bridge.Html5;
using System.Threading.Tasks;
using System.Reflection;
using System.Collections.Generic;

[assembly: Reflectable]

namespace AndresFour
{
    [Reflectable(false)] //Bridge 16.0 Workaround for #2728.
    public static class LevelEditor
    {
        static Level level;
        static HTMLDivElement left;
        static HTMLDivElement right;
        static HTMLTableElement table;

        static void Save ()
        {
            SaveToStorage();
            //HTMLAnchorElement download = new HTMLAnchorElement
            //{
            //    Download = "level.dat",
            //    Href = $"data:text/plain;charset=UTF-8,{Global.Btoa(JSON.Stringify(dynamicVal))}"
            //};
            //download.Click();
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

        public static async void CreateLevel ()
        {
            var level = (Level)(await Level.Create((object)MainStarter.levelTemplate));
            levels.Add(level);
            LevelEditor.level = level;
            SelectLevel(level);
            SaveToStorage();
        }

        public static List<Level> levels;

        public static void SaveToStorage ()
        {
            dynamic[] resulting = new dynamic[] { };
            foreach (var level in levels)
            {
                var dynamicVal = level.ToDynamic();
                if (level == LevelEditor.level)
                    dynamicVal.recovery = creation;
                resulting.Push((object)dynamicVal);
            }
            Global.LocalStorage.SetItem("levels", JSON.Stringify(resulting));
        }

        public static async Task LoadFromStorage ()
        {
            levels.Clear();
            dynamic dStorage = JSON.Parse(Global.LocalStorage.GetItem("levels").As<string>());
            foreach (var stItem in (object[])dStorage)
                levels.Add((Level)(await Level.Create(stItem)));
        }

        static dynamic creation;

        static void SelectLevel (Level level)
        {
            creation = level.ToDynamic();
            LevelEditor.level = level;
            Document.Body.InnerHTML = string.Empty;
            SetupLevel();
            Refresh();
        }

        static void SetupLevel ()
        {
            level.Canvas.OnClick = Click;
            level.Canvas.Style.Border = "1px solid black";
            Document.Body.AppendChild(left = new HTMLDivElement());
            Document.Body.AppendChild(right = new HTMLDivElement());
            right.AppendChild(table = new HTMLTableElement());
            left.Style.Width = "50%";
            right.Style.Width = "50%";
            left.Style.CssFloat = Float.Left;
            right.Style.CssFloat = Float.Right;
            left.AppendChild(level.Canvas);
            HTMLButtonElement button = new HTMLButtonElement
            {
                InnerHTML = "Save",
                OnClick = e => Save()
            };
            button.Style.Position = Position.Fixed;
            button.Style.Bottom = "0";
            button.Style.Left = "0";
            Document.Body.AppendChild(button);
        }

        public static HTMLDivElement CreateLevelSelectDiv (Action<Level> toSelect)
        {
            HTMLDivElement result = new HTMLDivElement();
            result.Style.Border = "1px solid black";
            HTMLUListElement list = new HTMLUListElement();
            foreach (var level in levels)
            {
                HTMLLIElement levelA = new HTMLLIElement();
                levelA.AppendChild(new HTMLAnchorElement
                {
                    Href = "javascript:void(0)",
                    OnClick = e => toSelect(level),
                    InnerHTML = level.Name
                });
                list.AppendChild(levelA);
            }
            result.AppendChild(list);
            return result;
        }

        public static async void Start()
        {
            await LoadFromStorage();
            cross = await BridgeEssentials.LoadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4QUVEx4JDRbQCAAAAzNJREFUeNrt3cFt4zAQBdCfxRbhdBHAhcSXACnDZaSCPfsYIAWkigBpYS/BAt4euAdJgOLVSCNyKJGc/wHdbIrzH2I7sBIBDMMwDMMwjH3uNA8KKU92mJS+Zh8TUhdwmNTOfirPcwDwDOABwB8AbwA+hg0QpcsNxhHAE7ruPgG8ousufvH+OATgPQBhdPwOwOPoMe4Tvh+PfUfjzt77LuP6Gi1+vll4OL4CcCLKfxinvpupzs4WIBdhcaJgFUbou5zt6YfinHOve/cAfgE4jTfoJTeznvou7meeYvIecpx4PXT/k7LyJ2N43z1avGQNb1JLJ3SDEoHxZfIhiCiLnWyHIWzANcruGMJGXKIUgyFsyBVKcRjCxlygFIshbLBplOIxhI02iVINhrDhplCqwxA23gRKtRjCAFWjVI8hDFIlSjMYwkBVoTSHIQxWBUqzGMKARaM0jyEMWiSKGwxh4KJQ3GEIgxeB4hZDKGBXFPcYQhG7oBBjvpBNUYihK2YTFGKsKygrCjHiisqCQoyVyYlCjMjkQCFGYixRiGEUCxRiGMcQhRhWMUAhhnUSUIiRKxEof/uDGLkSgUKM3DFCIYZlElGIkSMTH2uvCoxrKOQyozXR/BVuiUn+tyFMZCJ+6cvyJReDZAyiWMYIgygWicC4Kt7oiRKTCIzho22Wbx5dJwGjiOu+mooBBlGsYohBlNRYYAhrEWVtLDGENYmiTQ4MYW2iLCUnhnAOoiiLyvq1K1HWFbTJd+BE0RWz6QUJRJkvZJerQ4gyXcSul+q4RykJQ9iTH5QSMYS9tY9SMoawx3ZRasAQ9toeSk0Ywp7bQakRQ9h7/Sg1Ywgz1IvSAoYwS30oLWEIM9WD0iKGMFv5KC1jCDOWi+IBQ5i1PBRPGMLM5aB4xBBm3x/FM4bQwX4oxBC72B6FGIudbIdCDHU326CMnqy9saQLjIl+tChmN5Z8IcZiR1qUFwuQCzFUPWlQLhYgZ2Kou1pCOVuA8Ab3ikygRN3g/m7pJH0OAJ4BPKC7BfUbgA/VIo5yU/QRwBO67j4BvKK/ffdcX1qQuAUcJrUzVZ8h5ckOw74YhmEYhmFKyz+CH5J6R0WlaQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNS0yMVQxOTozMDowOSswMDowME2eJS8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDUtMjFUMTk6MzA6MDkrMDA6MDA8w52TAAAAAElFTkSuQmCC");
            cross.Width = 10;
            cross.Height = 10;
            //HTMLDivElement start = new HTMLDivElement();
            //HTMLInputElement input = new HTMLInputElement();
            //HTMLInputElement file = new HTMLInputElement
            //{
            //    Type = InputType.File
            //};
            //start.AppendChild(input);
            //start.AppendChild(new Text(" or"));
            //start.AppendChild(new HTMLBRElement());
            //start.AppendChild(file);
            Document.Body.InnerHTML = "";
            var start = new HTMLDivElement();
            start.AppendChild(new HTMLButtonElement
            {
                InnerHTML = "Create Level",
                OnClick = e => CreateLevel()
            });
            start.AppendChild(CreateLevelSelectDiv(SelectLevel));
            Document.Body.AppendChild(start);
        }

        public static void Remove (GameObject gameObject)
        {
            if (!level.Children.Remove(gameObject))
                throw new Exception();
            Refresh();
        }

        public static void CreateCell (HTMLTableElement table, params Node[] toAppend)
        {
            var row1 = new HTMLTableRowElement();
            table.AppendChild(row1);
            var cell1 = new HTMLTableDataCellElement();
            foreach (var append in toAppend)
                cell1.AppendChild(append);
            row1.AppendChild(cell1);
        }

        static void Indent (this HTMLTableRowElement row, int indent)
        {
            for (int n = 0; n < indent; n++)
            {
                var cell = new HTMLTableDataCellElement();
                cell.Style.BorderRight = "1px solid black";
                row.AppendChild(cell);
            }
        }

        public static async Task<LevelEditorReference> CreateReference (GameObject gameObject, HTMLTableElement table, int indent = 0)
        {
            if (gameObject.Name == null)
                return null;
            HTMLTableRowElement row = new HTMLTableRowElement();
            row.Indent(indent);
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
            cross.AppendChild(LevelEditor.cross = LevelEditor.cross.CloneNode().As<HTMLImageElement>());
            cell.AppendChild(cross);
            row.AppendChild(cell);
            table.AppendChild(row);
            LevelEditorReference result = new LevelEditorReference
            {
                gameObject = gameObject,
                cells = new Dictionary<string, HTMLElement>(),
                members = new Dictionary<string, MemberInfo>()
            };
            string type;
            if (gameObject is Character)
                type = "Character";
            else if (gameObject is Shot)
                type = "Shot";
            else if (gameObject is RealGameObject)
                type = "Real Thing";
            else if (gameObject is DrawnGameObject)
                type = "Illusion";
            else if (gameObject is Movement)
                type = "Movement by User";
            else if (gameObject is Shoot_OnKey)
                type = "Shooting by User";
            else if (gameObject is Level)
                type = "Level";
            else
                throw new Exception($"Type not allowed: {gameObject.GetType().FullName}");
            row = new HTMLTableRowElement();
            row.Indent(indent);
            cell = new HTMLTableDataCellElement
            {
                InnerHTML = "Type"
            };
            HTMLTableDataCellElement cell2 = new HTMLTableDataCellElement
            {
                InnerHTML = type
            };
            result.cells.Add("Type", cell2);
            row.AppendChild(cell);
            row.AppendChild(cell2);
            table.AppendChild(row);
            List<MemberInfo> fields = new List<MemberInfo>(gameObject.GetType().GetFields());
            fields.AddRange(gameObject.GetType().GetProperties());
            foreach (var field in fields)
            {
                if (field.IsStatic) continue;
                Type memberType;
                if (field is FieldInfo)
                    memberType = ((FieldInfo)field).FieldType;
                else if (field is PropertyInfo)
                    memberType = ((PropertyInfo)field).PropertyType;
                else
                    throw new Exception();
                var customAttributes2 = (ObjectCreatorAttribute[])field.GetCustomAttributes(typeof(ObjectCreatorAttribute));
                string s;
                GameObject o;
                if (allowed.Contains(memberType) || customAttributes2.Length == 1)
                {
                    object value;
                    if (field is FieldInfo)
                        value = ((FieldInfo)field).GetValue(gameObject);
                    else if (field is PropertyInfo)
                        value = ((PropertyInfo)field).GetValue(gameObject);
                    else
                        throw new Exception();
                    if (value == null)
                        continue;
                    if (customAttributes2.Length == 1)
                        value = await GameObject.Create(value);
                    row = new HTMLTableRowElement();
                    row.Indent(indent);
                    var contentEditable = ContentEditable.True;
                    string valueString;
                    s = value as string;
                    if (s != null)
                        valueString = s;
                    else if (value is double)
                        valueString = ((double)value).ToString();
                    else
                    {
                        contentEditable = ContentEditable.False;
                        if (value is List<GameObject>)
                            valueString = "List of Objects";
                        else if (value is List<OnKeyEvent>)
                            valueString = "List of Key Press Actions";
                        else if (value is GameObject)
                            valueString = "Object";
                        else
                            throw new Exception();
                    }
                    string name = field.Name;
                    var customAttributes = (LevelEditorNameAttribute[])field.GetCustomAttributes(typeof(LevelEditorNameAttribute));
                    if (customAttributes.Length == 1)
                        name = customAttributes[0].LevelEditorName;
                    cell = new HTMLTableDataCellElement
                    {
                        InnerHTML = name
                    };
                    cell2 = new HTMLTableDataCellElement
                    {
                        ContentEditable = contentEditable,
                        InnerHTML = valueString
                    };
                    result.cells.Add(field.Name, cell2);
                    result.members.Add(field.Name, field);
                    row.AppendChild(cell);
                    row.AppendChild(cell2);
                    table.AppendChild(row);
                    if (value is List<GameObject> || value is List<OnKeyEvent>)
                        foreach (GameObject _gameObject in (System.Collections.IList)(value as List<GameObject>) ?? (System.Collections.IList)(value as List<OnKeyEvent>))
                            await CreateReference(_gameObject, table, indent + 1);
                    o = value as GameObject;
                    if (o != null)
                        await CreateReference(o, table, indent + 1);
                }
            }
            row = new HTMLTableRowElement();
            row.Indent(indent);
            cell = new HTMLTableDataCellElement();
            cell.AppendChild(new HTMLButtonElement
            {
                InnerHTML = "Save Changes",
                OnClick = e => SaveChanges(result)
            });
            row.AppendChild(cell);
            table.AppendChild(row);
            return result;
        }

        static readonly Type[] allowed = { typeof(string), typeof(double), typeof(List<GameObject>), typeof(List<OnKeyEvent>), typeof(GameObject)};

        public static void SaveChanges (LevelEditorReference reference)
        {
            foreach (var cell in reference.cells)
            {
                if (cell.Key == "Type")
                    continue;
                var memberInfo = reference.members[cell.Key];
                Type value;
                if (memberInfo is FieldInfo)
                    value = ((FieldInfo)memberInfo).FieldType;
                else if (memberInfo is PropertyInfo)
                    value = ((PropertyInfo)memberInfo).PropertyType;
                else
                    throw new Exception();
                object toWriteValue;
                if (value == typeof(string))
                    toWriteValue = cell.Value.InnerHTML;
                else if (value == typeof(double))
                    toWriteValue = double.Parse(cell.Value.InnerHTML);
                else
                    throw new Exception();
                if (memberInfo is FieldInfo)
                    ((FieldInfo)memberInfo).SetValue(reference.gameObject, toWriteValue);
                else
                    ((PropertyInfo)memberInfo).SetValue(reference.gameObject, toWriteValue);
            }
            Refresh();
        }

        public static void Click (MouseEvent<HTMLCanvasElement> mouseEvent)
        {
            mouseDownEvent?.SetResult(new Vector2
            {
                X = mouseEvent.LayerX,
                Y = mouseEvent.LayerY
            });
        }

        static TaskCompletionSource<Vector2> mouseDownEvent;

        public static async Task<Vector2> WaitForClick ()
        {
            mouseDownEvent = new TaskCompletionSource<Vector2>();
            Vector2 result = await mouseDownEvent.Task;
            mouseDownEvent = null;
            return result;
        }

        public static async void CreateRectangle()
        {
            Vector2 a = await WaitForClick();
            Vector2 b = await WaitForClick();
            Rectangle rect = new Rectangle
            {
                X = a.X,
                Y = a.Y,
                Width = b.X - a.X,
                Height = b.Y - a.Y
            };
            RealGameObject created = new RealGameObject
            {
                Gravity = 0,
                Position = rect,
                Image = "#ffffff",
                Name = "New Object"
            };
            level.Children.Add(created);
            Select(created);
            Refresh();
        }

        static async void CreateBlock ()
        {
            Vector2 at = await WaitForClick();
            Rectangle create = new Rectangle
            {
                Width = 32,
                Height = 32,
                X = at.X - 16,
                Y = at.Y - 16
            };
            RealGameObject created = new RealGameObject
            {
                Gravity = 0,
                Position = create,
                Image = "#ffffff",
                Name = "New Block"
            };
            level.Children.Add(created);
            Select(created);
            Refresh();
        }

        public static void Refresh ()
        {
            table.InnerHTML = "";
            //CreateCell(table, new HTMLAnchorElement
            //{
            //    Href = "javascript:void(0)",
            //    InnerHTML = "Create Rectangle",
            //    OnClick = e => CreateRectangle()
            //});
            CreateCell(table, new HTMLAnchorElement
            {
                Href = "javascript:void(0)",
                InnerHTML = "Create Block",
                OnClick = e => CreateBlock()
            });
            CreateCell(table, new HTMLAnchorElement
            {
                Href = "javascript:void(0)",
                OnClick = e => Select(null),
                InnerHTML = "Unselect"
            });
            Refresh(gameObject: level, table: table);
            level.Draw();
        }

        static void Refresh (HTMLTableElement table, GameObject gameObject)
        {
            if (string.IsNullOrEmpty(gameObject.Name))
                return;
            CreateReference(gameObject, table);
        }

        static GameObject selected;
        static HTMLImageElement cross;

        public static void Select(GameObject gameObject)
        {
            if (selected is DrawnGameObject)
                selected.As<DrawnGameObject>().Selected = false;
            if ((selected = gameObject) is DrawnGameObject)
                gameObject.As<DrawnGameObject>().Selected = true;
            Refresh();
        }
    }
}