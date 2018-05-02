using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class Transition : MonoBehaviour
{
    MeshRenderer m_Renderer;

    public GameObject sphere;

    public float speed = 0.01f;
    public float acceleration = 0.05f;
    private float t0;
    private GameObject tripod;

    private Vector3 originalScale;
    private Vector3 focusedScale;

    private GameObject parentSphere;
    private bool _translated;
    private bool _moving;

    private bool _rotating;

    void Start()
    {
        originalScale = transform.localScale;
        focusedScale = new Vector3(0.01f, 0.01f, 0.01f) + originalScale;
        tripod = GameObject.Find("Tripod");
        if (tripod == null)
        {
            throw new UnityException("Tripod GameObject not found");
        }

        parentSphere = transform.parent.gameObject;
    }

    void OnMouseOver()
    {
        transform.localScale = focusedScale;

        if (Input.GetMouseButtonDown(0))
        {
            _moving = true;
            _rotating = true;
            t0 = Time.time;
        }
    }

    void OnMouseExit()
    {
        transform.localScale = originalScale;
    }

    void Update()
    {
        if (_moving || _rotating)
        {
            gameObject.GetComponent<Renderer>().enabled = false;

            float v = speed + acceleration * (Time.time - t0);

            Vector3 movementDirection = (sphere.transform.position - parentSphere.transform.position).normalized;
            tripod.transform.position += movementDirection * v;
            float radius = parentSphere.GetComponent<Renderer>().bounds.extents.x;

            if (!_translated)
            {
                if ((parentSphere.transform.position - tripod.transform.position).magnitude > 0)
                {
                    tripod.transform.position = sphere.transform.position - (movementDirection * (radius - 2f));
                    _translated = true;
                }
            }
            else
            {
                _rotating = true;

                if (sphere.transform.Find("Pointer") != null)
                {
                    Vector3 targetDir = sphere.transform.Find("Pointer").position - tripod.transform.position;

                    if (Vector3.Angle(targetDir, tripod.transform.rotation.eulerAngles) < 1)
                    {
                        _rotating = false;
                    }

                    float step = 0.5f * Time.deltaTime;
                    Vector3 newDir = Vector3.RotateTowards(tripod.transform.forward, targetDir, step, 0.0f);

                    // Move our position a step closer to the target.
                    tripod.transform.rotation = Quaternion.LookRotation(newDir);
                }


                if (Mathf.Abs((sphere.transform.position - tripod.transform.position).magnitude) < 0.1f)
                {
                    tripod.transform.position = sphere.transform.position;
                    // if not rotated enough, rotate till the end
                    // todo

                    gameObject.GetComponent<Renderer>().enabled = true;

                    foreach (Renderer r in sphere.GetComponentsInChildren<Renderer>())
                    {
                        r.enabled = true;
                    }

                    if (sphere.transform.Find("Pointer") != null)
                    {
                        tripod.transform.LookAt(sphere.transform.Find("Pointer"));
                    }
                    
                    reinit();
                }
            }
        }
    }

    void reinit()
    {
        _moving = false;
        _translated = false;
        _rotating = false;
    }
}