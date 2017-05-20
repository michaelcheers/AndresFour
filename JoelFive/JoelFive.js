/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0-beta
 */
Bridge.assembly("JoelFive", function ($asm, globals) {
    "use strict";

    Bridge.define("JoelFive.App", {
        main: function Main() {
            var $step = 0,
                $task1, 
                $taskResult1, 
                $task2, 
                $taskResult2, 
                $jumpFromFinally, 
                input, 
                task, 
                parseString, 
                game, 
                $asyncBody = Bridge.fn.bind(this, function () {
                    for (;;) {
                        $step = System.Array.min([0,1,2], $step);
                        switch ($step) {
                            case 0: {
                                input = document.createElement('input');
                                document.body.appendChild(input);
                                task = new System.Threading.Tasks.TaskCompletionSource();
                                input.oninput = function (e) {
                                    task.setResult(input.value);
                                };
                                $task1 = task.task;
                                $step = 1;
                                $task1.continueWith($asyncBody, true);
                                return;
                            }
                            case 1: {
                                $taskResult1 = $task1.getAwaitedResult();
                                parseString = Bridge.global.atob($taskResult1);
                                input.style.display = "none";
                                $task2 = JoelFive.Game.Create(JSON.parse(parseString));
                                $step = 2;
                                $task2.continueWith($asyncBody, true);
                                return;
                            }
                            case 2: {
                                $taskResult2 = $task2.getAwaitedResult();
                                game = $taskResult2;
                                document.body.appendChild(game.Canvas);
                                game.Start();
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
                smallNumber: 0
            },
            ctors: {
                init: function () {
                    this.smallNumber = 0.0001;
                }
            },
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
                                            if (type === "character") {
                                                $step = 1;
                                                continue;
                                            }
                                            else if (type === "real game object") {
                                                $step = 3;
                                                continue;
                                            }
                                            else if (type === "drawn game object") {
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
        fields: {
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
                                        $task1 = JoelFive.App.LoadImage(imageString);
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

    Bridge.define("JoelFive.Game", {
        inherits: [JoelFive.GameObject],
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
        }
    });

    Bridge.define("JoelFive.RealGameObject", {
        inherits: [JoelFive.DrawnGameObject],
        fields: {
            Gravity: 0,
            onSolid: false
        },
        methods: {
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
            TryMove$1: function ($in, NotMovingIn, MovingIn, NotMovingInLength, MovingInLength, Velocity, GetMovingIn) {
                var $t, $t1, $t2;
                var intersects = new (System.Collections.Generic.List$1(JoelFive.RealGameObject))();
                $t = Bridge.getEnumerator($in.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        if (Bridge.is(child, JoelFive.RealGameObject)) {
                            var realGameObject = child;
                            var rect = ($t1=new JoelFive.Rectangle(), $t1.X = NotMovingIn, $t1.Width = NotMovingInLength, $t1.Y = MovingIn.v + MovingInLength, $t1.Height = Velocity, $t1);
                            if (GetMovingIn(rect.$clone()) === rect.X) {
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
                    var movingInLength = MovingInLength;
                    var min = System.Linq.Enumerable.from(intersects).min(function (v) {
                            return GetMovingIn(v.Position.$clone()) - movingInLength;
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
                    return this.TryMove$1($in, this.Position.Y, Bridge.ref(this.Position, "X"), this.Position.Height, this.Position.Width, velocity.X, $asm.$.JoelFive.RealGameObject.f1);
                }
                if (velocity.Y !== 0) {
                    return this.TryMove$1($in, this.Position.X, Bridge.ref(this.Position, "Y"), this.Position.Width, this.Position.Height, velocity.Y, $asm.$.JoelFive.RealGameObject.f2);
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
            return v.Y;
        }
    });

    Bridge.define("JoelFive.Character", {
        inherits: [JoelFive.RealGameObject],
        fields: {
            movements: null
        },
        methods: {
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
});
