/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0-beta
 */
Bridge.assembly("JoelFive.LevelEditor", function ($asm, globals) {
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
                $jumpFromFinally, 
                start, 
                input, 
                file, 
                $t, 
                task, 
                parseString, 
                $t1, 
                $t2, 
                $t3, 
                button, 
                $t4, 
                $asyncBody = Bridge.fn.bind(this, function () {
                    for (;;) {
                        $step = System.Array.min([0,1,2], $step);
                        switch ($step) {
                            case 0: {
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
                                $step = 1;
                                $task1.continueWith($asyncBody, true);
                                return;
                            }
                            case 1: {
                                $taskResult1 = $task1.getAwaitedResult();
                                parseString = Bridge.global.atob($taskResult1);
                                start.style.display = "none";
                                $task2 = JoelFive.Game.Create(JSON.parse(parseString));
                                $step = 2;
                                $task2.continueWith($asyncBody, true);
                                return;
                            }
                            case 2: {
                                $taskResult2 = $task2.getAwaitedResult();
                                JoelFive.LevelEditor.App.game = $taskResult2;
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
                                JoelFive.LevelEditor.App.Reload();
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
                selected: null
            },
            methods: {
                Save: function () {
                    var $t;
                    var download = ($t=document.createElement('a'), $t.download = "level.dat", $t.href = System.String.format("data:text/plain;charset=UTF-8,{0}", Bridge.global.btoa(JSON.stringify(JoelFive.LevelEditor.App.game.toDynamic()))), $t);
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
                Reload: function () {
                    var $t, $t1, $t2;
                    JoelFive.LevelEditor.App.table.innerHTML = "";
                    $t = Bridge.getEnumerator(JoelFive.LevelEditor.App.game.Children);
                    try {
                        while ($t.moveNext()) {
                            $t1 = (function () {
                                var gameObject = $t.Current;
                                if (System.String.isNullOrEmpty(gameObject.Name)) {
                                    return {jump:1};
                                }
                                var row = document.createElement('tr');
                                var cell = document.createElement('td');
                                cell.appendChild(($t2=document.createElement('a'), $t2.innerHTML = gameObject.Name, $t2.href = "javascript:void(0)", $t2.onclick = function (v) {
                                    JoelFive.LevelEditor.App.Select(gameObject);
                                }, $t2));
                                cell.appendChild(document.createElement('br'));
                                var text;
                                if (Bridge.is(gameObject, JoelFive.Character)) {
                                    text = "Character";
                                } else {
                                    if (Bridge.is(gameObject, JoelFive.RealGameObject)) {
                                        text = "Real Thing";
                                    } else {
                                        if (Bridge.is(gameObject, JoelFive.DrawnGameObject)) {
                                            text = "Illusion";
                                        } else {
                                            throw new System.Exception(System.String.format("Type not allowed: {0}", Bridge.Reflection.getTypeFullName(Bridge.getType(gameObject))));
                                        }
                                    }
                                }
                                cell.appendChild(document.createTextNode(text));
                                row.appendChild(cell);
                                JoelFive.LevelEditor.App.table.appendChild(row);
                            }).call(this) || {};
                            if($t1.jump == 1) continue;
                        }
                    }finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
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
                    JoelFive.LevelEditor.App.Reload();
                }
            }
        }
    });

    Bridge.ns("JoelFive.LevelEditor.App", $asm.$);

    Bridge.apply($asm.$.JoelFive.LevelEditor.App, {
        f1: function (e) {
        JoelFive.LevelEditor.App.Save();
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
});
