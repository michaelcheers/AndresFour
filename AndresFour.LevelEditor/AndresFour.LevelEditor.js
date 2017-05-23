/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0-beta
 */
Bridge.assembly("AndresFour.LevelEditor", function ($asm, globals) {
    "use strict";

    Bridge.define("JoelFive.BridgeEssentials", {
        statics: {
            methods: {
                LoadImage: function (value) {
                    var $t;
                    var image = ($t=new Image(), $t.src = value, $t);
                    var task = new System.Threading.Tasks.TaskCompletionSource();
                    image.onload = function (e) {
                        task.setResult(image);
                    };
                    return task.task;
                }
            }
        }
    });

    Bridge.define("JoelFive.GameObject", {
        statics: {
            methods: {
                Create: function (dynamic) {
                    var $step = 0,
                        $task1, 
                        $task2, 
                        $task3, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        result, 
                        type, 
                        character, 
                        realGameObject, 
                        drawnGameObject, 
                        $async_e, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1,2,3,4,5,6,7], $step);
                                    switch ($step) {
                                        case 0: {
                                            result = null;
                                            type = dynamic.type;
                                            if (type === JoelFive.Character.Type) {
                                                $step = 1;
                                                continue;
                                            }
                                            else if (type === JoelFive.RealGameObject.Type) {
                                                $step = 3;
                                                continue;
                                            }
                                            else if (type === JoelFive.DrawnGameObject.Type) {
                                                $step = 5;
                                                continue;
                                            }
                                            $step = 7;
                                            continue;
                                        }
                                        case 1: {
                                            character = new JoelFive.Character();
                                            $task1 = character.Parse(dynamic);
                                            $step = 2;
                                            $task1.continueWith($asyncBody);
                                            return;
                                        }
                                        case 2: {
                                            $task1.getAwaitedResult();
                                            result = character;
                                            $step = 7;
                                            continue;
                                        }
                                        case 3: {
                                            realGameObject = new JoelFive.RealGameObject();
                                            $task2 = realGameObject.Parse(dynamic);
                                            $step = 4;
                                            $task2.continueWith($asyncBody);
                                            return;
                                        }
                                        case 4: {
                                            $task2.getAwaitedResult();
                                            result = realGameObject;
                                            $step = 7;
                                            continue;
                                        }
                                        case 5: {
                                            drawnGameObject = new JoelFive.DrawnGameObject();
                                            $task3 = drawnGameObject.Parse(dynamic);
                                            $step = 6;
                                            $task3.continueWith($asyncBody);
                                            return;
                                        }
                                        case 6: {
                                            $task3.getAwaitedResult();
                                            result = drawnGameObject;
                                            $step = 7;
                                            continue;
                                        }
                                        case 7: {
                                            if (dynamic.name != null) {
                                                result.Name = dynamic.name;
                                            }
                                            $tcs.setResult(result);
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                }
            }
        },
        fields: {
            Name: null
        },
        methods: {
            Save: function (dynamic) {
                dynamic.name = this.Name;
            },
            AddKeys: function (addTo) {
                addTo.add("Name", "Name");
            },
            toDynamic: function () {
                var result = {  };
                var type;
                if (Bridge.is(this, JoelFive.Character)) {
                    type = JoelFive.Character.Type;
                } else {
                    if (Bridge.is(this, JoelFive.RealGameObject)) {
                        type = JoelFive.RealGameObject.Type;
                    } else {
                        if (Bridge.is(this, JoelFive.DrawnGameObject)) {
                            type = JoelFive.DrawnGameObject.Type;
                        } else {
                            throw new System.Exception(System.String.format("Invalid type: {0}", Bridge.getType(this)));
                        }
                    }
                }
                result.type = type;
                this.Save(result);
                return result;
            }
        }
    });

    Bridge.define("JoelFive.Game", {
        statics: {
            methods: {
                Create: function (dynamic) {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        children, 
                        game, 
                        $t, 
                        $t1, 
                        $t2, 
                        item, 
                        $async_e, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1,2,3,4], $step);
                                    switch ($step) {
                                        case 0: {
                                            game = ($t=new JoelFive.Game(), $t.Children = (children = new (System.Collections.Generic.List$1(JoelFive.GameObject))()), $t.Interval = dynamic.interval, $t.DrawInterval = dynamic.drawInterval, $t.Canvas = ($t1=document.createElement('canvas'), $t1.width = dynamic.width, $t1.height = dynamic.height, $t1), $t.Down = new (System.Collections.Generic.HashSet$1(System.Int32)).ctor(), $t);
                                            $t2 = Bridge.getEnumerator(Bridge.cast(dynamic.children, System.Array.type(System.Object)));
                                            $step = 1;
                                            continue;
                                        }
                                        case 1: {
                                            if ($t2.moveNext()) {
                                                item = $t2.Current;
                                                $step = 2;
                                                continue;
                                            }
                                            $step = 4;
                                            continue;
                                        }
                                        case 2: {
                                            $task1 = JoelFive.GameObject.Create(item);
                                            $step = 3;
                                            $task1.continueWith($asyncBody);
                                            return;
                                        }
                                        case 3: {
                                            $taskResult1 = $task1.getAwaitedResult();
                                            children.add($taskResult1);
                                            $step = 1;
                                            continue;
                                        }
                                        case 4: {
                                            $tcs.setResult(game);
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                }
            }
        },
        fields: {
            Children: null,
            Interval: 0,
            DrawInterval: 0,
            Canvas: null,
            Down: null
        },
        methods: {
            Start: function () {
                document.body.onkeyup = Bridge.fn.bind(this, $asm.$.JoelFive.Game.f1);
                document.body.onkeydown = Bridge.fn.bind(this, $asm.$.JoelFive.Game.f2);
                Bridge.global.setInterval(Bridge.fn.cacheBind(this, this.Update), this.Interval);
                Bridge.global.setInterval(Bridge.fn.cacheBind(this, this.Draw), this.DrawInterval);
            },
            toDynamic: function () {
                return { width: this.Canvas.width, height: this.Canvas.height, interval: this.Interval, drawInterval: this.DrawInterval, children: this.Children.convertAll(System.Object, $asm.$.JoelFive.Game.f3).toArray() };
            },
            Draw: function () {
                var $t;
                var context = this.Canvas.getContext("2d");
                context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
                $t = Bridge.getEnumerator(this.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        if (Bridge.is(child, JoelFive.DrawnGameObject)) {
                            var drawObject = child; /// 'is' expression's given expression is never of the provided type


                            if (Bridge.is(drawObject.Image, System.String)) {
                                context.fillStyle = drawObject.Image;
                                context.fillRect(drawObject.X, drawObject.Y, drawObject.Width, drawObject.Height);
                            } else {
                                context.drawImage(drawObject.Image, drawObject.X, drawObject.Y);
                            }
                            if (drawObject.Selected) {
                                context.strokeStyle = "#4286f4";
                                context.strokeRect(((Bridge.Int.clip32(drawObject.X) - 1) | 0), ((Bridge.Int.clip32(drawObject.Y) - 1) | 0), ((Bridge.Int.clip32(drawObject.Width) + 2) | 0), ((Bridge.Int.clip32(drawObject.Height) + 2) | 0));
                            }
                        }
                    }
                }finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            Update: function () {
                var $t;
                $t = Bridge.getEnumerator(this.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        if (Bridge.is(child, JoelFive.RealGameObject)) {
                            child.Update(this);
                        }
                    }
                }finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }}
        }
    });

    Bridge.ns("JoelFive.Game", $asm.$);

    Bridge.apply($asm.$.JoelFive.Game, {
        f1: function (e) {
            this.Down.remove(e.keyCode);
        },
        f2: function (e) {
            this.Down.add(e.keyCode);
        },
        f3: function (v) {
            return v.toDynamic();
        }
    });

    Bridge.define("JoelFive.LevelEditor.App", {
        main: function Main() {
            var $step = 0,
                $task1, 
                $taskResult1, 
                $task2, 
                $taskResult2, 
                $task3, 
                $taskResult3, 
                $jumpFromFinally, 
                start, 
                input, 
                file, 
                $t, 
                task, 
                parseString, 
                jsonObject, 
                $t1, 
                $t2, 
                $t3, 
                button, 
                $t4, 
                $asyncBody = Bridge.fn.bind(this, function () {
                    for (;;) {
                        $step = System.Array.min([0,1,2,3], $step);
                        switch ($step) {
                            case 0: {
                                $task2 = JoelFive.BridgeEssentials.LoadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4QUVEx4JDRbQCAAAAzNJREFUeNrt3cFt4zAQBdCfxRbhdBHAhcSXACnDZaSCPfsYIAWkigBpYS/BAt4euAdJgOLVSCNyKJGc/wHdbIrzH2I7sBIBDMMwDMMwjH3uNA8KKU92mJS+Zh8TUhdwmNTOfirPcwDwDOABwB8AbwA+hg0QpcsNxhHAE7ruPgG8ousufvH+OATgPQBhdPwOwOPoMe4Tvh+PfUfjzt77LuP6Gi1+vll4OL4CcCLKfxinvpupzs4WIBdhcaJgFUbou5zt6YfinHOve/cAfgE4jTfoJTeznvou7meeYvIecpx4PXT/k7LyJ2N43z1avGQNb1JLJ3SDEoHxZfIhiCiLnWyHIWzANcruGMJGXKIUgyFsyBVKcRjCxlygFIshbLBplOIxhI02iVINhrDhplCqwxA23gRKtRjCAFWjVI8hDFIlSjMYwkBVoTSHIQxWBUqzGMKARaM0jyEMWiSKGwxh4KJQ3GEIgxeB4hZDKGBXFPcYQhG7oBBjvpBNUYihK2YTFGKsKygrCjHiisqCQoyVyYlCjMjkQCFGYixRiGEUCxRiGMcQhRhWMUAhhnUSUIiRKxEof/uDGLkSgUKM3DFCIYZlElGIkSMTH2uvCoxrKOQyozXR/BVuiUn+tyFMZCJ+6cvyJReDZAyiWMYIgygWicC4Kt7oiRKTCIzho22Wbx5dJwGjiOu+mooBBlGsYohBlNRYYAhrEWVtLDGENYmiTQ4MYW2iLCUnhnAOoiiLyvq1K1HWFbTJd+BE0RWz6QUJRJkvZJerQ4gyXcSul+q4RykJQ9iTH5QSMYS9tY9SMoawx3ZRasAQ9toeSk0Ywp7bQakRQ9h7/Sg1Ywgz1IvSAoYwS30oLWEIM9WD0iKGMFv5KC1jCDOWi+IBQ5i1PBRPGMLM5aB4xBBm3x/FM4bQwX4oxBC72B6FGIudbIdCDHU326CMnqy9saQLjIl+tChmN5Z8IcZiR1qUFwuQCzFUPWlQLhYgZ2Kou1pCOVuA8Ab3ikygRN3g/m7pJH0OAJ4BPKC7BfUbgA/VIo5yU/QRwBO67j4BvKK/ffdcX1qQuAUcJrUzVZ8h5ckOw74YhmEYhmFKyz+CH5J6R0WlaQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNS0yMVQxOTozMDowOSswMDowME2eJS8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDUtMjFUMTk6MzA6MDkrMDA6MDA8w52TAAAAAElFTkSuQmCC");
                                $step = 1;
                                $task2.continueWith($asyncBody, true);
                                return;
                            }
                            case 1: {
                                $taskResult2 = $task2.getAwaitedResult();
                                JoelFive.LevelEditor.App.cross = $taskResult2;
                                JoelFive.LevelEditor.App.cross.width = 10;
                                JoelFive.LevelEditor.App.cross.height = 10;
                                start = document.createElement('div');
                                input = document.createElement('input');
                                file = ($t=document.createElement('input'), $t.type = "file", $t);
                                start.appendChild(input);
                                start.appendChild(document.createTextNode(" or"));
                                start.appendChild(document.createElement('br'));
                                start.appendChild(file);
                                document.body.appendChild(start);
                                task = new System.Threading.Tasks.TaskCompletionSource();
                                input.oninput = function (e) {
                                    task.setResult(input.value);
                                };
                                file.onchange = function (e) {
                                    var $step = 0,
                                        $task1, 
                                        $taskResult1, 
                                        e, 
                                        $jumpFromFinally, 
                                        $asyncBody = Bridge.fn.bind(this, function () {
                                            for (;;) {
                                                $step = System.Array.min([0,1], $step);
                                                switch ($step) {
                                                    case 0: {
                                                        $task1 = JoelFive.LevelEditor.App.FileRead(file);
                                                        $step = 1;
                                                        $task1.continueWith($asyncBody, true);
                                                        return;
                                                    }
                                                    case 1: {
                                                        $taskResult1 = $task1.getAwaitedResult();
                                                        task.setResult($taskResult1)
                                                        return;
                                                    }
                                                    default: {
                                                        return;
                                                    }
                                                }
                                            }
                                        }, arguments);

                                    $asyncBody();
                                };
                                $task1 = task.task;
                                $step = 2;
                                $task1.continueWith($asyncBody, true);
                                return;
                            }
                            case 2: {
                                $taskResult1 = $task1.getAwaitedResult();
                                parseString = Bridge.global.atob($taskResult1);
                                jsonObject = JSON.parse(parseString);
                                JoelFive.LevelEditor.App.creation = jsonObject;
                                start.style.display = "none";
                                $task3 = JoelFive.Game.Create(jsonObject);
                                $step = 3;
                                $task3.continueWith($asyncBody, true);
                                return;
                            }
                            case 3: {
                                $taskResult3 = $task3.getAwaitedResult();
                                JoelFive.LevelEditor.App.game = $taskResult3;
                                JoelFive.LevelEditor.App.game.Canvas.onclick = JoelFive.LevelEditor.App.Click;
                                JoelFive.LevelEditor.App.game.Canvas.style.border = "1px solid black";
                                document.body.appendChild(($t1 = document.createElement('div'), JoelFive.LevelEditor.App.left = $t1, $t1));
                                document.body.appendChild(($t2 = document.createElement('div'), JoelFive.LevelEditor.App.right = $t2, $t2));
                                JoelFive.LevelEditor.App.right.appendChild(($t3 = document.createElement('table'), JoelFive.LevelEditor.App.table = $t3, $t3));
                                JoelFive.LevelEditor.App.left.style.width = "50%";
                                JoelFive.LevelEditor.App.right.style.width = "50%";
                                JoelFive.LevelEditor.App.left.style.cssFloat = "left";
                                JoelFive.LevelEditor.App.right.style.cssFloat = "right";
                                JoelFive.LevelEditor.App.left.appendChild(JoelFive.LevelEditor.App.game.Canvas);
                                button = ($t4=document.createElement('button'), $t4.innerHTML = "Save", $t4.onclick = $asm.$.JoelFive.LevelEditor.App.f1, $t4);
                                button.style.position = "fixed";
                                button.style.bottom = "0";
                                button.style.left = "0";
                                document.body.appendChild(button);
                                JoelFive.LevelEditor.App.Refresh();
                                return;
                            }
                            default: {
                                return;
                            }
                        }
                    }
                }, arguments);

            $asyncBody();
        },
        statics: {
            fields: {
                game: null,
                left: null,
                right: null,
                table: null,
                creation: null,
                allowed: null,
                mouseDownEvent: null,
                selected: null,
                cross: null
            },
            ctors: {
                init: function () {
                    this.allowed = System.Array.init([System.String, System.Double], Function);
                }
            },
            methods: {
                Save: function () {
                    var $t;
                    var dynamicVal = JoelFive.LevelEditor.App.game.toDynamic();
                    dynamicVal.recovery = JoelFive.LevelEditor.App.creation;
                    var download = ($t=document.createElement('a'), $t.download = "level.dat", $t.href = System.String.format("data:text/plain;charset=UTF-8,{0}", Bridge.global.btoa(JSON.stringify(dynamicVal))), $t);
                    download.click();
                },
                FileRead: function (fileInput) {
                    var file = fileInput.files[System.Array.index(0, fileInput.files)];
                    var fileReader = new FileReader();
                    var task = new System.Threading.Tasks.TaskCompletionSource();
                    fileReader.onload = function (e) {
                        task.setResult(fileReader.result);
                    };
                    fileReader.readAsText(file);
                    return task.task;
                },
                Remove: function (gameObject) {
                    if (!JoelFive.LevelEditor.App.game.Children.remove(gameObject)) {
                        throw new System.Exception();
                    }
                    JoelFive.LevelEditor.App.Refresh();
                },
                CreateCell: function (table, toAppend) {
                    var $t;
                    if (toAppend === void 0) { toAppend = []; }
                    var row1 = document.createElement('tr');
                    table.appendChild(row1);
                    var cell1 = document.createElement('td');
                    $t = Bridge.getEnumerator(toAppend);
                    try {
                        while ($t.moveNext()) {
                            var append = $t.Current;
                            cell1.appendChild(append);
                        }
                    }finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }row1.appendChild(cell1);
                },
                CreateReference: function (gameObject, outTable) {
                    var $t, $t1, $t2, $t3, $t4, $t5, $t6;
                    var result = ($t=new JoelFive.LevelEditor.LevelEditorReference(), $t.gameObject = gameObject, $t.cells = new (System.Collections.Generic.Dictionary$2(System.String,HTMLElement))(), $t.members = new (System.Collections.Generic.Dictionary$2(System.String,System.Object))(), $t);
                    var type;
                    if (Bridge.is(gameObject, JoelFive.Character)) {
                        type = "Character";
                    } else {
                        if (Bridge.is(gameObject, JoelFive.RealGameObject)) {
                            type = "Real Thing";
                        } else {
                            if (Bridge.is(gameObject, JoelFive.DrawnGameObject)) {
                                type = "Illusion";
                            } else {
                                throw new System.Exception(System.String.format("Type not allowed: {0}", Bridge.Reflection.getTypeFullName(Bridge.getType(gameObject))));
                            }
                        }
                    }
                    var table = document.createElement('table');
                    var row = document.createElement('tr');
                    var cell = ($t1=document.createElement('td'), $t1.innerHTML = "Type", $t1);
                    var cell2 = ($t2=document.createElement('td'), $t2.innerHTML = type, $t2);
                    result.cells.add("Type", cell2);
                    row.appendChild(cell);
                    row.appendChild(cell2);
                    table.appendChild(row);
                    var fields = new (System.Collections.Generic.List$1(System.Object))(Bridge.Reflection.getMembers(Bridge.getType(gameObject), 4, 28));
                    fields.addRange(Bridge.Reflection.getMembers(Bridge.getType(gameObject), 16, 28));
                    $t3 = Bridge.getEnumerator(fields);
                    try {
                        while ($t3.moveNext()) {
                            var field = $t3.Current;
                            if ((field.is || false)) {
                                continue;
                            }
                            var memberType;
                            if (Bridge.is(field, System.Reflection.FieldInfo)) {
                                memberType = Bridge.cast(field, System.Reflection.FieldInfo).rt;
                            } else {
                                if (Bridge.is(field, System.Reflection.PropertyInfo)) {
                                    memberType = Bridge.cast(field, System.Reflection.PropertyInfo).rt;
                                } else {
                                    throw new System.Exception();
                                }
                            }
                            if (System.Array.contains(JoelFive.LevelEditor.App.allowed, memberType, Function)) {
                                var value;
                                if (Bridge.is(field, System.Reflection.FieldInfo)) {
                                    value = Bridge.Reflection.fieldAccess(Bridge.cast(field, System.Reflection.FieldInfo), gameObject);
                                } else {
                                    if (Bridge.is(field, System.Reflection.PropertyInfo)) {
                                        value = Bridge.Reflection.midel(Bridge.cast(field, System.Reflection.PropertyInfo).g, gameObject)();
                                    } else {
                                        throw new System.Exception();
                                    }
                                }
                                row = document.createElement('tr');
                                var valueString;
                                if (Bridge.is(value, System.String)) {
                                    valueString = Bridge.cast(value, System.String);
                                } else {
                                    if (Bridge.is(value, System.Double)) {
                                        valueString = System.Double.format(System.Nullable.getValue(Bridge.cast(Bridge.unbox(value), System.Double)), 'G');
                                    } else {
                                        throw new System.Exception();
                                    }
                                }
                                cell = ($t4=document.createElement('td'), $t4.innerHTML = field.n, $t4);
                                cell2 = ($t5=document.createElement('td'), $t5.contentEditable = "true", $t5.innerHTML = valueString, $t5);
                                result.cells.add(field.n, cell2);
                                result.members.add(field.n, field);
                                row.appendChild(cell);
                                row.appendChild(cell2);
                                table.appendChild(row);
                            }
                        }
                    }finally {
                        if (Bridge.is($t3, System.IDisposable)) {
                            $t3.System$IDisposable$dispose();
                        }
                    }row = document.createElement('tr');
                    cell = document.createElement('td');
                    cell.appendChild(($t6=document.createElement('button'), $t6.innerHTML = "Save Changes", $t6.onclick = function (e) {
                        JoelFive.LevelEditor.App.SaveChanges(result);
                    }, $t6));
                    row.appendChild(cell);
                    table.appendChild(row);
                    outTable.v = table;
                    return result;
                },
                SaveChanges: function (reference) {
                    var $t;
                    $t = Bridge.getEnumerator(reference.cells);
                    try {
                        while ($t.moveNext()) {
                            var cell = $t.Current;
                            if (Bridge.referenceEquals(cell.key, "Type")) {
                                continue;
                            }
                            var memberInfo = reference.members.get(cell.key);
                            var value;
                            if (Bridge.is(memberInfo, System.Reflection.FieldInfo)) {
                                value = Bridge.cast(memberInfo, System.Reflection.FieldInfo).rt;
                            } else {
                                if (Bridge.is(memberInfo, System.Reflection.PropertyInfo)) {
                                    value = Bridge.cast(memberInfo, System.Reflection.PropertyInfo).rt;
                                } else {
                                    throw new System.Exception();
                                }
                            }
                            var toWriteValue;
                            if (Bridge.referenceEquals(value, System.String)) {
                                toWriteValue = cell.value.innerHTML;
                            } else {
                                if (Bridge.referenceEquals(value, System.Double)) {
                                    toWriteValue = Bridge.box(System.Double.parse(cell.value.innerHTML), System.Double, $box_.System.Double.toString);
                                } else {
                                    throw new System.Exception();
                                }
                            }
                            if (Bridge.is(memberInfo, System.Reflection.FieldInfo)) {
                                Bridge.Reflection.fieldAccess(Bridge.cast(memberInfo, System.Reflection.FieldInfo), reference.gameObject, Bridge.unbox(toWriteValue));
                            } else {
                                Bridge.Reflection.midel(Bridge.cast(memberInfo, System.Reflection.PropertyInfo).s, reference.gameObject)(Bridge.unbox(toWriteValue));
                            }
                        }
                    }finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }JoelFive.LevelEditor.App.Refresh();
                },
                Click: function (mouseEvent) {
                    var $t;
                    JoelFive.LevelEditor.App.mouseDownEvent != null ? JoelFive.LevelEditor.App.mouseDownEvent.setResult(($t=new JoelFive.Vector2(), $t.X = mouseEvent.layerX, $t.Y = mouseEvent.layerY, $t)) : null;
                },
                WaitForClick: function () {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        result, 
                        $async_e, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1], $step);
                                    switch ($step) {
                                        case 0: {
                                            JoelFive.LevelEditor.App.mouseDownEvent = new System.Threading.Tasks.TaskCompletionSource();
                                            $task1 = JoelFive.LevelEditor.App.mouseDownEvent.task;
                                            $step = 1;
                                            $task1.continueWith($asyncBody);
                                            return;
                                        }
                                        case 1: {
                                            $taskResult1 = $task1.getAwaitedResult();
                                            result = $taskResult1;
                                            JoelFive.LevelEditor.App.mouseDownEvent = null;
                                            $tcs.setResult(result.$clone());
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                },
                CreateRectangle: function () {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $task2, 
                        $taskResult2, 
                        $jumpFromFinally, 
                        a, 
                        b, 
                        rect, 
                        $t, 
                        created, 
                        $t1, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1,2], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = JoelFive.LevelEditor.App.WaitForClick();
                                        $step = 1;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        a = $taskResult1;
                                        $task2 = JoelFive.LevelEditor.App.WaitForClick();
                                        $step = 2;
                                        $task2.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        b = $taskResult2;
                                        rect = ($t=new JoelFive.Rectangle(), $t.X = a.X, $t.Y = a.Y, $t.Width = b.X - a.X, $t.Height = b.Y - a.Y, $t);
                                        created = ($t1=new JoelFive.RealGameObject(), $t1.Gravity = 0, $t1.Position = rect.$clone(), $t1.Image = "#ffffff", $t1.Name = "New Object", $t1);
                                        JoelFive.LevelEditor.App.game.Children.add(created);
                                        JoelFive.LevelEditor.App.Select(created);
                                        JoelFive.LevelEditor.App.Refresh();
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
                },
                Refresh: function () {
                    var $t, $t1, $t2, $t3, $t4, $t5, $t6;
                    JoelFive.LevelEditor.App.table.innerHTML = "";
                    JoelFive.LevelEditor.App.CreateCell(JoelFive.LevelEditor.App.table, [($t=document.createElement('a'), $t.href = "javascript:void(0)", $t.innerHTML = "Create Rectangle", $t.onclick = $asm.$.JoelFive.LevelEditor.App.f2, $t)]);
                    JoelFive.LevelEditor.App.CreateCell(JoelFive.LevelEditor.App.table, [($t1=document.createElement('a'), $t1.href = "javascript:void(0)", $t1.onclick = $asm.$.JoelFive.LevelEditor.App.f3, $t1.innerHTML = "Unselect", $t1)]);
                    $t2 = Bridge.getEnumerator(JoelFive.LevelEditor.App.game.Children);
                    try {
                        while ($t2.moveNext()) {
                            $t3 = (function () {
                                var gameObject = $t2.Current;
                                if (System.String.isNullOrEmpty(gameObject.Name)) {
                                    return {jump:1};
                                }
                                var row = document.createElement('tr');
                                var cell = document.createElement('td');
                                cell.style.borderBottom = "1px solid black";
                                cell.appendChild(($t4=document.createElement('a'), $t4.innerHTML = gameObject.Name, $t4.href = "javascript:void(0)", $t4.onclick = function (v) {
                                    JoelFive.LevelEditor.App.Select(gameObject);
                                }, $t4));
                                cell.appendChild(document.createTextNode(" "));
                                var cross = ($t5=document.createElement('a'), $t5.onclick = function (v) {
                                    JoelFive.LevelEditor.App.Remove(gameObject);
                                }, $t5.href = "javascript:void(0)", $t5);
                                cross.appendChild(($t6 = JoelFive.LevelEditor.App.cross.cloneNode(), JoelFive.LevelEditor.App.cross = $t6, $t6));
                                cell.appendChild(cross);
                                cell.appendChild(document.createElement('br'));
                                var tableNested = { };
                                var reference = JoelFive.LevelEditor.App.CreateReference(gameObject, tableNested);
                                cell.appendChild(tableNested.v);
                                row.appendChild(cell);
                                JoelFive.LevelEditor.App.table.appendChild(row);
                            }).call(this) || {};
                            if($t3.jump == 1) continue;
                        }
                    }finally {
                        if (Bridge.is($t2, System.IDisposable)) {
                            $t2.System$IDisposable$dispose();
                        }
                    }JoelFive.LevelEditor.App.game.Draw();
                },
                Select: function (gameObject) {
                    if (Bridge.is(JoelFive.LevelEditor.App.selected, JoelFive.DrawnGameObject)) {
                        JoelFive.LevelEditor.App.selected.Selected = false;
                    }
                    if (Bridge.is(((JoelFive.LevelEditor.App.selected = gameObject, gameObject)), JoelFive.DrawnGameObject)) {
                        gameObject.Selected = true;
                    }
                    JoelFive.LevelEditor.App.Refresh();
                }
            }
        }
    });

    Bridge.ns("JoelFive.LevelEditor.App", $asm.$);

    Bridge.apply($asm.$.JoelFive.LevelEditor.App, {
        f1: function (e) {
        JoelFive.LevelEditor.App.Save();
    },
        f2: function (e) {
            JoelFive.LevelEditor.App.CreateRectangle();
        },
        f3: function (e) {
            JoelFive.LevelEditor.App.Select(null);
        }
    });

    Bridge.define("JoelFive.LevelEditor.LevelEditorReference", {
        fields: {
            gameObject: null,
            cells: null,
            members: null
        }
    });

    Bridge.define("JoelFive.Movement", {
        fields: {
            Velocity: null,
            Keys: null
        },
        ctors: {
            init: function () {
                this.Velocity = new JoelFive.Vector2();
            }
        }
    });

    Bridge.define("JoelFive.Rectangle", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new JoelFive.Rectangle(); }
            }
        },
        fields: {
            X: 0,
            Y: 0,
            _width: 0,
            _height: 0
        },
        props: {
            Width: {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    if (value < 0) {
                        this.X -= value;
                        value = -value;
                    }
                    this._width = value;
                }
            },
            Height: {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    if (value < 0) {
                        this.Y -= value;
                        value = -value;
                    }
                    this._height = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Gets whether or not the other {@link } intersects with this rectangle.
             *
             * @instance
             * @public
             * @this JoelFive.Rectangle
             * @memberof JoelFive.Rectangle
             * @param   {JoelFive.Rectangle}    value    The other rectangle for testing.
             * @return  {boolean}                        <pre><code>true</code></pre> if other {@link } intersects with this rectangle; <pre><code>false</code></pre> otherwise.
             */
            Intersects: function (value) {
                return value.X < this.X + this.Width && this.X < value.X + value.Width && value.Y < this.Y + this.Height && this.Y < value.Y + value.Height;
            },
            getHashCode: function () {
                var h = Bridge.addHash([3771388952, this.X, this.Y, this._width, this._height]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, JoelFive.Rectangle)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y) && Bridge.equals(this._width, o._width) && Bridge.equals(this._height, o._height);
            },
            $clone: function (to) {
                var s = to || new JoelFive.Rectangle();
                s.X = this.X;
                s.Y = this.Y;
                s._width = this._width;
                s._height = this._height;
                return s;
            }
        }
    });

    Bridge.define("JoelFive.Vector2", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new JoelFive.Vector2(); }
            }
        },
        fields: {
            X: 0,
            Y: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1955977157, this.X, this.Y]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, JoelFive.Vector2)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y);
            },
            $clone: function (to) {
                var s = to || new JoelFive.Vector2();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    Bridge.define("JoelFive.DrawnGameObject", {
        inherits: [JoelFive.GameObject],
        statics: {
            fields: {
                Type: null
            },
            ctors: {
                init: function () {
                    this.Type = "drawn game object";
                }
            }
        },
        fields: {
            Selected: false,
            Position: null,
            Image: null
        },
        props: {
            X: {
                get: function () {
                    return this.Position.X;
                },
                set: function (value) {
                    this.Position.X = value;
                }
            },
            Y: {
                get: function () {
                    return this.Position.Y;
                },
                set: function (value) {
                    this.Position.Y = value;
                }
            },
            Width: {
                get: function () {
                    return this.Position.Width;
                },
                set: function (value) {
                    this.Position.Width = value;
                }
            },
            Height: {
                get: function () {
                    return this.Position.Height;
                },
                set: function (value) {
                    this.Position.Height = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.Position = new JoelFive.Rectangle();
            }
        },
        methods: {
            Save: function (dynamic) {
                dynamic.x = this.X;
                dynamic.y = this.Y;
                dynamic.width = this.Width;
                dynamic.height = this.Height; /// 'is' expression's given expression is never of the provided type


                if (Bridge.is(this.Image, HTMLImageElement)) {
                    dynamic.image = this.Image.src;
                } else {
                    dynamic.image = this.Image;
                }
                JoelFive.GameObject.prototype.Save.call(this, dynamic);
            },
            Parse: function (dynamic) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    imageString, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4], $step);
                                switch ($step) {
                                    case 0: {
                                        this.X = dynamic.x;
                                        this.Y = dynamic.y;
                                        this.Width = dynamic.width;
                                        this.Height = dynamic.height;
                                        imageString = dynamic.image;
                                        if (imageString.charCodeAt(0) === 35) {
                                            $step = 1;
                                            continue;
                                        } else  {
                                            $step = 2;
                                            continue;
                                        }
                                    }
                                    case 1: {
                                        this.Image = imageString;
                                        $step = 4;
                                        continue;
                                    }
                                    case 2: {
                                        $task1 = JoelFive.BridgeEssentials.LoadImage(imageString);
                                        $step = 3;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 3: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        this.Image = $taskResult1;
                                        $step = 4;
                                        continue;
                                    }
                                    case 4: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("JoelFive.RealGameObject", {
        inherits: [JoelFive.DrawnGameObject],
        statics: {
            fields: {
                Type: null
            },
            ctors: {
                init: function () {
                    this.Type = "real game object";
                }
            }
        },
        fields: {
            Gravity: 0,
            onSolid: false
        },
        methods: {
            Save: function (dynamic) {
                dynamic.gravity = this.Gravity;
                JoelFive.DrawnGameObject.prototype.Save.call(this, dynamic);
            },
            Parse: function (dynamic) {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        this.Gravity = dynamic.gravity;
                                        $task1 = JoelFive.DrawnGameObject.prototype.Parse.call(this, dynamic);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            TryMove$1: function ($in, NotMovingIn, MovingIn, NotMovingInLength, MovingInLength, Velocity, GetMovingIn, GetMovingInLength) {
                var $t, $t1, $t2;
                if (Velocity < 0) {
                    return this.TryMoveNegative($in, NotMovingIn, MovingIn, NotMovingInLength, MovingInLength, -Velocity, GetMovingIn, GetMovingInLength);
                }
                var intersects = new (System.Collections.Generic.List$1(JoelFive.RealGameObject))();
                $t = Bridge.getEnumerator($in.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        if (Bridge.is(child, JoelFive.RealGameObject)) {
                            var realGameObject = child;
                            var rect = ($t1=new JoelFive.Rectangle(), $t1.X = NotMovingIn, $t1.Width = NotMovingInLength, $t1.Y = MovingIn.v + MovingInLength, $t1.Height = Velocity, $t1);
                            if (GetMovingIn(rect.$clone()) === rect.X && GetMovingInLength(rect.$clone()) === rect.Width) {
                                var newX = rect.Y;
                                var newY = rect.X;
                                var newWidth = rect.Height;
                                var newHeight = rect.Width;
                                rect = ($t2=new JoelFive.Rectangle(), $t2.X = newX, $t2.Y = newY, $t2.Width = newWidth, $t2.Height = newHeight, $t2);
                            }
                            var doesIntersect = rect.Intersects(realGameObject.Position.$clone());
                            if (doesIntersect) {
                                intersects.add(realGameObject);
                            }
                        }
                    }
                }finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }if (intersects.Count === 0) {
                    MovingIn.v += Velocity;
                } else {
                    var min = System.Linq.Enumerable.from(intersects).min(function (v) {
                            return GetMovingIn(v.Position.$clone()) - MovingInLength;
                        });
                    MovingIn.v = min;
                    return false;
                }
                return true;
            },
            TryMove: function ($in, velocity) {
                var $t, $t1;
                if (velocity.X !== 0 && velocity.Y !== 0) {
                    var canMove = true;
                    canMove = this.TryMove($in, ($t=new JoelFive.Vector2(), $t.X = velocity.X, $t)) ? canMove : false;
                    canMove = this.TryMove($in, ($t1=new JoelFive.Vector2(), $t1.Y = velocity.Y, $t1)) ? canMove : false;
                    return canMove;
                }
                if (velocity.X !== 0) {
                    return this.TryMove$1($in, this.Position.Y, Bridge.ref(this.Position, "X"), this.Position.Height, this.Position.Width, velocity.X, $asm.$.JoelFive.RealGameObject.f1, $asm.$.JoelFive.RealGameObject.f2);
                }
                if (velocity.Y !== 0) {
                    return this.TryMove$1($in, this.Position.X, Bridge.ref(this.Position, "Y"), this.Position.Width, this.Position.Height, velocity.Y, $asm.$.JoelFive.RealGameObject.f3, $asm.$.JoelFive.RealGameObject.f4);
                }
                return true;
            },
            TryMoveNegative: function ($in, NotMovingIn, MovingIn, NotMovingInLength, MovingInLength, Velocity, GetMovingIn, GetMovingInLength) {
                var $t, $t1, $t2;
                var intersects = new (System.Collections.Generic.List$1(JoelFive.RealGameObject))();
                $t = Bridge.getEnumerator($in.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        if (Bridge.is(child, JoelFive.RealGameObject)) {
                            var realGameObject = child;
                            var rect = ($t1=new JoelFive.Rectangle(), $t1.X = NotMovingIn, $t1.Width = NotMovingInLength, $t1.Y = MovingIn.v - Velocity, $t1.Height = Velocity, $t1);
                            if (GetMovingIn(rect.$clone()) === rect.X && GetMovingInLength(rect.$clone()) === rect.Width) {
                                var newX = rect.Y;
                                var newY = rect.X;
                                var newWidth = rect.Height;
                                var newHeight = rect.Width;
                                rect = ($t2=new JoelFive.Rectangle(), $t2.X = newX, $t2.Y = newY, $t2.Width = newWidth, $t2.Height = newHeight, $t2);
                            }
                            var doesIntersect = rect.Intersects(realGameObject.Position.$clone());
                            if (doesIntersect) {
                                intersects.add(realGameObject);
                            }
                        }
                    }
                }finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }if (intersects.Count === 0) {
                    MovingIn.v -= Velocity;
                } else {
                    var max = System.Linq.Enumerable.from(intersects).max(function (v) {
                            return GetMovingIn(v.Position.$clone()) + GetMovingInLength(v.Position.$clone());
                        });
                    MovingIn.v = max;
                    return false;
                }
                return true;
            },
            Update: function ($in) {
                var $t;
                this.onSolid = !this.TryMove($in, ($t=new JoelFive.Vector2(), $t.Y = this.Gravity, $t));
            }
        }
    });

    Bridge.ns("JoelFive.RealGameObject", $asm.$);

    Bridge.apply($asm.$.JoelFive.RealGameObject, {
        f1: function (v) {
            return v.X;
        },
        f2: function (v) {
            return v.Width;
        },
        f3: function (v) {
            return v.Y;
        },
        f4: function (v) {
            return v.Height;
        }
    });

    Bridge.define("JoelFive.Character", {
        inherits: [JoelFive.RealGameObject],
        statics: {
            fields: {
                Type: null
            },
            ctors: {
                init: function () {
                    this.Type = "character";
                }
            }
        },
        fields: {
            movements: null
        },
        methods: {
            Save: function (dynamic) {
                dynamic.movements = this.movements.convertAll(System.Object, $asm.$.JoelFive.Character.f1).toArray();
                JoelFive.RealGameObject.prototype.Save.call(this, dynamic);
            },
            Update: function ($in) {
                var $t, $t1;
                JoelFive.RealGameObject.prototype.Update.call(this, $in);
                if (this.onSolid) {
                    $t = Bridge.getEnumerator(this.movements);
                    try {
                        while ($t.moveNext()) {
                            $t1 = (function () {
                                var movement = $t.Current;
                                if (System.Linq.Enumerable.from(movement.Keys).all(function (key) {
                                        return $in.Down.contains(key);
                                    })) {
                                    this.TryMove($in, movement.Velocity.$clone());
                                    return {jump:2};
                                }
                            }).call(this) || {};
                            if($t1.jump == 2) break;
                        }
                    }finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }}
            },
            Parse: function (dynamic) {
                var $step = 0,
                    $task1, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $t, 
                    movementDynamic, 
                    movement, 
                    $t1, 
                    $t2, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        this.movements = new (System.Collections.Generic.List$1(JoelFive.Movement))();
                                        $t = Bridge.getEnumerator(dynamic.movements);
                                        try {
                                            while ($t.moveNext()) {
                                                movementDynamic = $t.Current;
                                                movement = ($t1=new JoelFive.Movement(), $t1.Velocity = ($t2=new JoelFive.Vector2(), $t2.X = movementDynamic.x, $t2.Y = movementDynamic.y, $t2), $t1.Keys = System.Linq.Enumerable.from(Bridge.cast(movementDynamic.keys, System.Array.type(System.Int32))).toList(System.Int32), $t1);
                                                this.movements.add(movement);
                                            }
                                        }finally {
                                            if (Bridge.is($t, System.IDisposable)) {
                                                $t.System$IDisposable$dispose();
                                            }
                                        }$task1 = JoelFive.RealGameObject.prototype.Parse.call(this, dynamic);
                                        $step = 1;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.ns("JoelFive.Character", $asm.$);

    Bridge.apply($asm.$.JoelFive.Character, {
        f1: function (v) {
            return { keys: v.Keys.toArray(), x: v.Velocity.X, y: v.Velocity.Y };
        }
    });

    var $box_ = {};

    Bridge.ns("System.Double", $box_);

    Bridge.apply($box_.System.Double, {
        toString: function (obj) {return System.Double.format(obj, 'G');}
    });

    var $m = Bridge.setMetadata,
        $n = [System,System.Threading.Tasks,JoelFive,System.Collections.Generic,JoelFive.LevelEditor];
    $m($n[2].BridgeEssentials, function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"LoadImage","is":true,"t":8,"pi":[{"n":"value","pt":$n[0].String,"ps":0}],"sn":"LoadImage","rt":$n[1].Task$1,"p":[$n[0].String]}]}; });
    $m($n[2].Character, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":2,"n":"Parse","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Parse","rt":$n[1].Task,"p":[System.Object]},{"ov":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[0].Object,"p":[System.Object]},{"ov":true,"a":2,"n":"Update","t":8,"pi":[{"n":"in","pt":$n[2].Game,"ps":0}],"sn":"Update","rt":$n[0].Object,"p":[$n[2].Game]},{"a":2,"n":"Type","is":true,"t":4,"rt":$n[0].String,"sn":"Type"},{"a":2,"n":"movements","t":4,"rt":$n[3].List$1(JoelFive.Movement),"sn":"movements"}]}; });
    $m($n[2].DrawnGameObject, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"v":true,"a":2,"n":"Parse","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Parse","rt":$n[1].Task,"p":[System.Object]},{"ov":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[0].Object,"p":[System.Object]},{"a":2,"n":"Height","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Height","t":8,"rt":$n[0].Double,"fg":"Height"},"s":{"a":2,"n":"set_Height","t":8,"p":[$n[0].Double],"rt":$n[0].Object,"fs":"Height"},"fn":"Height"},{"a":2,"n":"Width","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Width","t":8,"rt":$n[0].Double,"fg":"Width"},"s":{"a":2,"n":"set_Width","t":8,"p":[$n[0].Double],"rt":$n[0].Object,"fs":"Width"},"fn":"Width"},{"a":2,"n":"X","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_X","t":8,"rt":$n[0].Double,"fg":"X"},"s":{"a":2,"n":"set_X","t":8,"p":[$n[0].Double],"rt":$n[0].Object,"fs":"X"},"fn":"X"},{"a":2,"n":"Y","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Y","t":8,"rt":$n[0].Double,"fg":"Y"},"s":{"a":2,"n":"set_Y","t":8,"p":[$n[0].Double],"rt":$n[0].Object,"fs":"Y"},"fn":"Y"},{"a":2,"n":"Image","t":4,"rt":System.Object,"sn":"Image"},{"a":2,"n":"Position","t":4,"rt":$n[2].Rectangle,"sn":"Position"},{"a":4,"n":"Selected","t":4,"rt":$n[0].Boolean,"sn":"Selected"},{"a":2,"n":"Type","is":true,"t":4,"rt":$n[0].String,"sn":"Type"}]}; });
    $m($n[2].Game, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Create","is":true,"t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Create","rt":$n[1].Task$1,"p":[System.Object]},{"a":2,"n":"Draw","t":8,"sn":"Draw","rt":$n[0].Object},{"a":2,"n":"Start","t":8,"sn":"Start","rt":$n[0].Object},{"ov":true,"a":2,"n":"ToDynamic","t":8,"sn":"toDynamic","rt":System.Object},{"a":2,"n":"Update","t":8,"sn":"Update","rt":$n[0].Object},{"a":2,"n":"Canvas","t":4,"rt":HTMLCanvasElement,"sn":"Canvas"},{"a":2,"n":"Children","t":4,"rt":$n[3].List$1(JoelFive.GameObject),"sn":"Children"},{"a":2,"n":"Down","t":4,"rt":$n[3].HashSet$1(System.Int32),"sn":"Down"},{"a":2,"n":"DrawInterval","t":4,"rt":$n[0].Int32,"sn":"DrawInterval"},{"a":2,"n":"Interval","t":4,"rt":$n[0].Int32,"sn":"Interval"}]}; });
    $m($n[2].GameObject, function () { return {"att":1048705,"a":2,"m":[{"a":3,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"v":true,"a":2,"n":"AddKeys","t":8,"pi":[{"n":"addTo","pt":$n[3].Dictionary$2(System.String,System.String),"ps":0}],"sn":"AddKeys","rt":$n[0].Object,"p":[$n[3].Dictionary$2(System.String,System.String)]},{"a":2,"n":"Create","is":true,"t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Create","rt":$n[1].Task$1,"p":[System.Object]},{"v":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[0].Object,"p":[System.Object]},{"ov":true,"a":2,"n":"ToDynamic","t":8,"sn":"toDynamic","rt":System.Object},{"a":2,"n":"Name","t":4,"rt":$n[0].String,"sn":"Name"}]}; });
    $m($n[2].Movement, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Keys","t":4,"rt":$n[3].List$1(System.Int32),"sn":"Keys"},{"a":2,"n":"Velocity","t":4,"rt":$n[2].Vector2,"sn":"Velocity"}]}; });
    $m($n[2].RealGameObject, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":2,"n":"Parse","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Parse","rt":$n[1].Task,"p":[System.Object]},{"ov":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[0].Object,"p":[System.Object]},{"a":2,"n":"TryMove","t":8,"pi":[{"n":"in","pt":$n[2].Game,"ps":0},{"n":"velocity","pt":$n[2].Vector2,"ps":1}],"sn":"TryMove","rt":$n[0].Boolean,"p":[$n[2].Game,$n[2].Vector2]},{"a":2,"n":"TryMove","t":8,"pi":[{"n":"in","pt":$n[2].Game,"ps":0},{"n":"NotMovingIn","pt":$n[0].Double,"ps":1},{"n":"MovingIn","ref":true,"pt":$n[0].Double,"ps":2},{"n":"NotMovingInLength","pt":$n[0].Double,"ps":3},{"n":"MovingInLength","pt":$n[0].Double,"ps":4},{"n":"Velocity","pt":$n[0].Double,"ps":5},{"n":"GetMovingIn","pt":Function,"ps":6},{"n":"GetMovingInLength","pt":Function,"ps":7}],"sn":"TryMove$1","rt":$n[0].Boolean,"p":[$n[2].Game,$n[0].Double,$n[0].Double,$n[0].Double,$n[0].Double,$n[0].Double,Function,Function]},{"a":2,"n":"TryMoveNegative","t":8,"pi":[{"n":"in","pt":$n[2].Game,"ps":0},{"n":"NotMovingIn","pt":$n[0].Double,"ps":1},{"n":"MovingIn","ref":true,"pt":$n[0].Double,"ps":2},{"n":"NotMovingInLength","pt":$n[0].Double,"ps":3},{"n":"MovingInLength","pt":$n[0].Double,"ps":4},{"n":"Velocity","pt":$n[0].Double,"ps":5},{"n":"GetMovingIn","pt":Function,"ps":6},{"n":"GetMovingInLength","pt":Function,"ps":7}],"sn":"TryMoveNegative","rt":$n[0].Boolean,"p":[$n[2].Game,$n[0].Double,$n[0].Double,$n[0].Double,$n[0].Double,$n[0].Double,Function,Function]},{"v":true,"a":2,"n":"Update","t":8,"pi":[{"n":"in","pt":$n[2].Game,"ps":0}],"sn":"Update","rt":$n[0].Object,"p":[$n[2].Game]},{"a":2,"n":"Gravity","t":4,"rt":$n[0].Double,"sn":"Gravity"},{"a":2,"n":"Type","is":true,"t":4,"rt":$n[0].String,"sn":"Type"},{"a":4,"n":"onSolid","t":4,"rt":$n[0].Boolean,"sn":"onSolid"}]}; });
    $m($n[2].Rectangle, function () { return {"att":1048841,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Intersects","t":8,"pi":[{"n":"value","pt":$n[2].Rectangle,"ps":0}],"sn":"Intersects","rt":$n[0].Boolean,"p":[$n[2].Rectangle]},{"a":2,"n":"Height","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Height","t":8,"rt":$n[0].Double,"fg":"Height"},"s":{"a":2,"n":"set_Height","t":8,"p":[$n[0].Double],"rt":$n[0].Object,"fs":"Height"},"fn":"Height"},{"a":2,"n":"Width","t":16,"rt":$n[0].Double,"g":{"a":2,"n":"get_Width","t":8,"rt":$n[0].Double,"fg":"Width"},"s":{"a":2,"n":"set_Width","t":8,"p":[$n[0].Double],"rt":$n[0].Object,"fs":"Width"},"fn":"Width"},{"a":2,"n":"X","t":4,"rt":$n[0].Double,"sn":"X"},{"a":2,"n":"Y","t":4,"rt":$n[0].Double,"sn":"Y"},{"a":1,"n":"_height","t":4,"rt":$n[0].Double,"sn":"_height"},{"a":1,"n":"_width","t":4,"rt":$n[0].Double,"sn":"_width"}]}; });
    $m($n[2].Vector2, function () { return {"att":1048841,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"X","t":4,"rt":$n[0].Double,"sn":"X"},{"a":2,"n":"Y","t":4,"rt":$n[0].Double,"sn":"Y"}]}; });
    $m($n[4].App, function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"Click","is":true,"t":8,"pi":[{"n":"mouseEvent","pt":MouseEvent(HTMLCanvasElement),"ps":0}],"sn":"Click","rt":$n[0].Object,"p":[MouseEvent(HTMLCanvasElement)]},{"a":2,"n":"CreateCell","is":true,"t":8,"pi":[{"n":"table","pt":HTMLTableElement,"ps":0},{"n":"toAppend","ip":true,"pt":System.Array.type(Node),"ps":1}],"sn":"CreateCell","rt":$n[0].Object,"p":[HTMLTableElement,System.Array.type(Node)]},{"a":2,"n":"CreateRectangle","is":true,"t":8,"sn":"CreateRectangle","rt":$n[0].Object},{"a":2,"n":"CreateReference","is":true,"t":8,"pi":[{"n":"gameObject","pt":$n[2].GameObject,"ps":0},{"n":"outTable","out":true,"pt":HTMLTableElement,"ps":1}],"sn":"CreateReference","rt":$n[4].LevelEditorReference,"p":[$n[2].GameObject,HTMLTableElement]},{"a":1,"n":"FileRead","is":true,"t":8,"pi":[{"n":"fileInput","pt":HTMLInputElement,"ps":0}],"sn":"FileRead","rt":$n[1].Task$1,"p":[HTMLInputElement]},{"a":2,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[0].Object},{"a":2,"n":"Refresh","is":true,"t":8,"sn":"Refresh","rt":$n[0].Object},{"a":2,"n":"Remove","is":true,"t":8,"pi":[{"n":"gameObject","pt":$n[2].GameObject,"ps":0}],"sn":"Remove","rt":$n[0].Object,"p":[$n[2].GameObject]},{"a":1,"n":"Save","is":true,"t":8,"sn":"Save","rt":$n[0].Object},{"a":2,"n":"SaveChanges","is":true,"t":8,"pi":[{"n":"reference","pt":$n[4].LevelEditorReference,"ps":0}],"sn":"SaveChanges","rt":$n[0].Object,"p":[$n[4].LevelEditorReference]},{"a":2,"n":"Select","is":true,"t":8,"pi":[{"n":"gameObject","pt":$n[2].GameObject,"ps":0}],"sn":"Select","rt":$n[0].Object,"p":[$n[2].GameObject]},{"a":2,"n":"WaitForClick","is":true,"t":8,"sn":"WaitForClick","rt":$n[1].Task$1},{"a":1,"n":"allowed","is":true,"t":4,"rt":$n[0].Array.type(Function),"sn":"allowed","ro":true},{"a":2,"n":"creation","is":true,"t":4,"rt":System.Object,"sn":"creation"},{"a":1,"n":"cross","is":true,"t":4,"rt":HTMLImageElement,"sn":"cross"},{"a":1,"n":"game","is":true,"t":4,"rt":$n[2].Game,"sn":"game"},{"a":1,"n":"left","is":true,"t":4,"rt":HTMLDivElement,"sn":"left"},{"a":1,"n":"mouseDownEvent","is":true,"t":4,"rt":$n[1].TaskCompletionSource,"sn":"mouseDownEvent"},{"a":1,"n":"right","is":true,"t":4,"rt":HTMLDivElement,"sn":"right"},{"a":1,"n":"selected","is":true,"t":4,"rt":$n[2].GameObject,"sn":"selected"},{"a":1,"n":"table","is":true,"t":4,"rt":HTMLTableElement,"sn":"table"}]}; });
    $m($n[4].LevelEditorReference, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"cells","t":4,"rt":$n[3].Dictionary$2(System.String,HTMLElement),"sn":"cells"},{"a":2,"n":"gameObject","t":4,"rt":$n[2].GameObject,"sn":"gameObject"},{"a":2,"n":"members","t":4,"rt":$n[3].Dictionary$2(System.String,System.Object),"sn":"members"}]}; });
});
