﻿using UnityEngine;

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

    private GameObject _parentSphere;
    private bool _translated;
    private bool _moving;

    private bool _rotating;
    private float _jitterAvoidance = 1.0f;

    private Quaternion _lastRotation;

    void Start()
    {
        originalScale = transform.localScale;
        focusedScale = new Vector3(0.01f, 0.01f, 0.01f) + originalScale;
        tripod = GameObject.Find("Tripod");
        if (tripod == null)
        {
            throw new UnityException("Tripod GameObject not found");
        }

        _parentSphere = transform.parent.gameObject;
        _lastRotation = tripod.transform.rotation;
    }

    void OnMouseOver()
    {
        transform.localScale = focusedScale;

        if (Input.GetMouseButtonDown(0))
        {
            _moving = true;
            _rotating = true;
            _translated = false;
            t0 = Time.time;
        }
    }

    void OnMouseExit()
    {
        transform.localScale = originalScale;
    }

    void Update()
    {
        if (!_moving && !_rotating)
        {
            return;
        }

        if (_moving || _rotating)
        {
            // Disable renderers for Navigation Crosses and disable user input
            Component[] renderers = sphere.GetComponentsInChildren(typeof(Renderer));
            foreach (Renderer r in renderers)
            {
                // if SphereInsideout
                if (r.GetType() == typeof(MeshRenderer))
                {
                    continue;
                } 
                
                r.enabled = false;
            }

            StreetViewCamera.disable = true;

            Vector3 movementDirection = (sphere.transform.position - _parentSphere.transform.position).normalized;

            if (!_translated)
            {
                float radius = _parentSphere.GetComponent<Renderer>().bounds.extents.x;
                tripod.transform.position = sphere.transform.position - (movementDirection * (radius - 2f));
                _translated = true;
            }

            if (_moving)
            {
                float v = speed + acceleration * (Time.time - t0);
                tripod.transform.position += movementDirection * v;
                if (Mathf.Abs((sphere.transform.position - tripod.transform.position).magnitude) < 0.1f)
                {
                    tripod.transform.position = sphere.transform.position;
                    _moving = false;
                }
            }

            if (_rotating)
            {
                if (sphere.transform.Find("Pointer") != null)
                {
                    if (!_moving && Quaternion.Angle(_lastRotation, tripod.transform.rotation) < 0.1)
                    {
                        _rotating = false;
                    }
                    else if (_moving &&  Quaternion.Angle(_lastRotation, tripod.transform.rotation) < 0.1)
                    {
                        _jitterAvoidance = 10.0f;
                    }
                    else if (Quaternion.Angle(_lastRotation, tripod.transform.rotation) > 0.1)
                    {
                        _jitterAvoidance = 1.0f;
                    }


                    _lastRotation = tripod.transform.rotation;

                    Vector3 targetDir = sphere.transform.Find("Pointer").position - tripod.transform.position;


                    float step = 0.9f * Time.deltaTime / _jitterAvoidance;
                    Vector3 newDir = Vector3.RotateTowards(tripod.transform.forward, targetDir, step, 0.0f);

                    // Move our position a step closer to the target.
                    tripod.transform.rotation = Quaternion.LookRotation(newDir);
                }
                else
                {
                    Debug.Log("Pointer not found");
                    _rotating = false;
                }
            }


            if (!_moving && !_rotating)
            {
                reinit();
            }
        }
    }

    void reinit()
    {
        _moving = false;
        _translated = false;
        _rotating = false;
        
        // Enable renderers
        Component[] renderers = sphere.GetComponentsInChildren(typeof(Renderer));
        foreach (Renderer r in renderers)
        {
            r.enabled = true;
        }
        
        StreetViewCamera.disable = false;
    }
}